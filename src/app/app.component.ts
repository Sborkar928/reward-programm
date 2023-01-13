import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reward-programm';
  transactions = [];
  data: any = {};
  constructor(private transactionService: TransactionService) {

  }

  ngOnInit() {
    this.transactionService.getTransaction().subscribe( (res: any)=> {
      console.log(this.transactionService.rewardPerMonth(res.transactions
        ));
        this.data = this.transactionService.rewardPerMonth(res.transactions);

    });
  }

  toArray(answers: any) {
    return Object.keys(answers).map(key => ({
      key,
      value:answers[key]
    }))
  }
}
