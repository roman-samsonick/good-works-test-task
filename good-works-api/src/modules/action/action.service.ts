import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "../../models/action.model";
import { Repository } from "typeorm";
import { AppError, EAppError } from "../../utils/errorUtils";
import { IAction, ICreateActionDto, IUpdateActionDto } from "../../interfaces/action.interfaces";
import { FriendshipService } from "../friendship/friendship.service";

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
    private readonly friendshipService: FriendshipService,
  ) {
  }

  private mapToAction(action: Action): IAction {
    return {
      id: action.id,
      name: action.name,
      description: action.description,
      completed: action.completed,
    }
  }

  async getAllDev() {
    return await this.actionRepository.find()
  }

  async create(userId: number, create: ICreateActionDto) {
    const action = new Action()

    action.name = create.name
    action.description = create.description
    action.creatorId = userId
    action.completed = false

    await this.actionRepository.save(action)

    return this.mapToAction(action)
  }

  async update(userId: number, actionId: number, update: IUpdateActionDto) {
    const action = await this.actionRepository.findOneBy({
      id: actionId,
    })

    if (!action) {
      throw new AppError(EAppError.ACTION_NOT_EXIST)
    }

    action.name = update.name ?? action.name
    action.description = update.description ?? action.description
    action.completed = update.completed ?? action.completed

    await this.actionRepository.save(action)

    return this.mapToAction(action)
  }

  async remove(userId: number, actionId: number) {
    const action = await this.actionRepository.findOneBy({
      id: actionId,
      creatorId: userId,
    })

    if (!action) {
      throw new AppError(EAppError.ACTION_NOT_EXIST)
    }

    await this.actionRepository.remove(action)
  }

  async getFriendActions(userId: number, friendId: number) {
    await this.friendshipService.assertIsFriends(userId, friendId)

    return await this.getUserActions(friendId)
  }

  async getUserActions(userId: number) {
    const actions = await this.actionRepository.findBy({
      creatorId: userId
    })

    return actions.map(this.mapToAction)
  }

  async removeAllActionsOfUser(userId: number) {
    const actions = await this.actionRepository.find({
      where: {
        creatorId: userId
      }
    })

    await this.actionRepository.remove(actions)
  }
}
