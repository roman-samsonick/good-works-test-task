import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { FriendshipService } from '../friendship/friendship.service';
import { ActionService } from '../action/action.service';

@Injectable()
export class GenerateService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
    private readonly actionsService: ActionService,
  ) {
  }

  async onModuleInit() {
    const before = Date.now();
    const users = await this.userService.getAllDev();

    if (!users.some(u => u.username === 'qwe')) {
      const user = await this.userService.createUser({
        name: 'qwe',
        username: 'qwe',
        password: 'qwe',
      });

      users.push(user);
    }

    for (let i = 0; i < 10; i++) {
      const username = `qwe${i}`;
      if (!users.some(u => u.username === username)) {
        const user = await this.userService.createUser({
          name: username,
          username: username,
          password: username,
        });

        users.push(user);

        for (let j = 0; j < 20; j++) {
          const action = await this.actionsService.create(user.id, {
            name: `${username} good work ${j + 1}`,
            description: `${username} did good work ${j + 1} days ago`,
          });

          if (Math.random() > 0.5) {
            await this.actionsService.update(user.id, action.id, {
              completed: true,
            });
          }
        }
      }
    }

    const qweUser = users.find(u => u.username === 'qwe');

    const friendships = await this.friendshipService.getFriendshipsOf(qweUser.id);

    for (let i = 0; i < 5; i++) {
      const userToInvite = users.find(u => u.username === `qwe${i}`);
      if (!friendships.relatedUsers.some(u => u.id === userToInvite.id)) {
        await this.friendshipService.invite(userToInvite.id, qweUser.id);
      }
    }

    const after = Date.now()
    const time = (after - before) / 1000

    console.log(`Base application data generated in ${time}s`)
  }
}
