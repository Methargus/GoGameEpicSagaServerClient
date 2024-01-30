import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private electronService: ElectronService ) { }

  sendJoinQueueRequest(boardSize: number, pvp: boolean) {
    this.electronService.ipcRenderer.send('JoinQueueMessageModel', { size: boardSize, type: pvp ? "pvp": "pve"});
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

  pass() {
    this.electronService.ipcRenderer.send('PassMessageModel', {pass: true});
  }

  giveUp() {
    this.electronService.ipcRenderer.send('GiveUpMessageModel', {giveUp: true});
  }

  getGameEndStatistics() : Observable<{ winnerColor: string, blackScore: number, whiteScore: number }> {
    return new Observable(subscriber => {
      this.electronService.ipcRenderer.on('GameEndStatisticsEvent', (event, arg) => {
        subscriber.next({ winnerColor: arg.winnerColor, blackScore: arg.blackScore, whiteScore: arg.whiteScore })
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
}

