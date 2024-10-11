import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friendship } from '../../models/friendship.model';
import { Repository } from 'typeorm';
import { AppError, EAppError } from '../../utils/errorUtils';
import { UserService } from '../user/user.service';
import { IFriendship, IFriendshipsWithRelatedUsers } from '../../interfaces/friendship.interfaces';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private readonly friendshipRepository: Repository<Friendship>,
    private readonly userService: UserService,
  ) {
  }

  private getFriendshipSortingValue(friendship: Friendship): string {
    return `${friendship.from}_${friendship.to}`;
  }

  private mapToFriendship(f: Friendship): IFriendship {
    return {
      from: f.from,
      to: f.to,
      id: f.id,
      pending: f.pending,
    };
  }

  async invite(from: number, to: number): Promise<IFriendship> {
    const fromUser = await this.userService.getLightUserById(from);

    if (!fromUser) {
      throw new AppError(EAppError.USER_NOT_EXIST);
    }

    const toUser = await this.userService.getLightUserById(from);

    if (!toUser) {
      throw new AppError(EAppError.USER_NOT_EXIST);
    }

    const alreadyExists = await this.friendshipRepository.findOne({
      where: [
        {
          from,
          to,
        },
        {
          from: to,
          to: from,
        },
      ],
    });

    if (alreadyExists) {
      throw new AppError(EAppError.FRIENDSHIP_ALREADY_EXIST);
    }

    const friendship = new Friendship();

    friendship.from = from;
    friendship.to = to;
    friendship.pending = true;

    await this.friendshipRepository.save(friendship);

    return this.mapToFriendship(friendship);
  }

  async accept(friendshipId: number, to: number): Promise<IFriendship> {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          id: friendshipId,
          to,
          pending: true,
        },
      ],
    });

    if (!friendship) {
      throw new AppError(EAppError.FRIENDSHIP_NOT_EXIST);
    }

    friendship.pending = false;

    await this.friendshipRepository.save(friendship);

    return this.mapToFriendship(friendship);
  }

  async reject(friendshipId: number, to: number): Promise<void> {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          id: friendshipId,
          to,
          pending: true,
        },
      ],
    });

    if (!friendship) {
      throw new AppError(EAppError.FRIENDSHIP_NOT_EXIST);
    }

    await this.friendshipRepository.remove(friendship);
  }

  async cancel(friendshipId: number, from: number): Promise<void> {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          id: friendshipId,
          from,
          pending: true,
        },
      ],
    });

    if (!friendship) {
      throw new AppError(EAppError.FRIENDSHIP_NOT_EXIST);
    }

    await this.friendshipRepository.remove(friendship);
  }

  async remove(friendshipId: number, userId: number): Promise<void> {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          id: friendshipId,
          from: userId,
          pending: false,
        },
        {
          id: friendshipId,
          to: userId,
          pending: false,
        },
      ],
    });

    if (!friendship) {
      throw new AppError(EAppError.FRIENDSHIP_NOT_EXIST);
    }

    await this.friendshipRepository.remove(friendship);
  }

  async getFriendshipsOf(userId: number): Promise<IFriendshipsWithRelatedUsers> {
    const friendships = await this.friendshipRepository.find({
      where: [
        {
          from: userId,
        },
        {
          to: userId,
        },
      ],
    });

    const relatedUsersIds = new Set(friendships.flatMap(f => [f.to, f.from]));

    return {
      friendships: friendships.map(this.mapToFriendship).sort(
        (a, b) => this.getFriendshipSortingValue(a).localeCompare(this.getFriendshipSortingValue(b)),
      ),
      relatedUsers: await this.userService.getManyByIds([...relatedUsersIds]),
    };
  }

  async getAllDev() {
    return this.friendshipRepository.find();
  }

  async assertIsFriends(userId: number, friendId: number) {
    const friendship = await this.friendshipRepository.findOne({
      where: [
        {
          from: userId,
          to: friendId,
          pending: false,
        },
        {
          from: friendId,
          to: userId,
          pending: false,
        },
      ],
    });

    if (!friendship) {
      throw new AppError(EAppError.NO_FRIENDSHIP_BETWEEN_USERS);
    }
  }

  async removeAllFriendshipsOfUser(userId: number) {
    const friendships = await this.friendshipRepository.find({
      where: [
        {
          from: userId,
        },
        {
          to: userId,
        },
      ],
    });

    await this.friendshipRepository.remove(friendships);
  }
}
