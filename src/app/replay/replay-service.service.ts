import { Injectable } from '@angular/core';
import { ElectronService } from '../core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {

  constructor(private electronService: ElectronService) { }

  getGameBoardOfGivenTurn(gameHash: string, turnNumber: number): Observable<{board: number[][]}> {
    console.log(gameHash, turnNumber)

    this.electronService.ipcRenderer.send('ReadGameTurnFromDbEvent', { 'gameHash': gameHash, 'turnNumber': turnNumber });
  
    return new Observable(subscriber => {
      this.electronService.ipcRenderer.on('GameBoardEvent', (event, arg) => {
        subscriber.next({ board: arg.board })
      })
    })
  }
}