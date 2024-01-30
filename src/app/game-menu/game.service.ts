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

  getGameBoard(): Observable<GameBoardMessageModel> {
    return new Observable(subscriber => {
      this.electronService.ipcRenderer.on('GameBoardEvent', (event, arg) => {
        subscriber.next({ board: arg.board })
      })
    })
  }

  //placesStone, and returns is move was valid
  placeStone(x: number, y: number) {
    this.electronService.ipcRenderer.send('PlaceStoneMessageModel', { x: x, y: y });
  
    return new Observable(subscriber => {
      this.electronService.ipcRenderer.on('IsMoveValidEvent', (event, arg) => {
        subscriber.next({ board: arg.result })
      })
    })
  }
}

interface GameStartMessageModel {
  playerColor: string
  boardSize: number
}

interface GameBoardMessageModel {
  board: number[][]
  // playerColor: string
  // boardSize: number
}