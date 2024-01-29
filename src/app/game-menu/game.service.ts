import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private electronService: ElectronService ) { }

  sendJoinQueueRequest(boardSize: number) {
    this.electronService.ipcRenderer.send('JoinQueueMessageModel', { size: boardSize });
  }

  sendLeaveQueueRequest() {
    this.electronService.ipcRenderer.send('LeaveQueueMessageModel');
  }

  isInQueue(): Observable<GameStartMessageModel> {
    return new Observable(subscriber => {
      this.electronService.ipcRenderer.on('GameStartEvent', (event, arg) => {
        subscriber.next({ playerColor: arg.type, boardSize: arg.size})
      })
    })
  }
}

interface GameStartMessageModel {
  playerColor: string
  boardSize: number
}