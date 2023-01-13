import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  
    constructor(private http: HttpClient) {
    }

    getTransaction() {
        return this.http.get('/assets/data.json');
    }

    calculateRewards(price: number) {
        if (price >=50 && price < 100) {
            return price-50;
        } else if (price >100){
            return (2*(price-100) + 50);
        }
        return 0;
    }

    getTotalRewards(transactions: any) {
        return transactions.length ? transactions.reduce((acc: number,key : any)=>key.bill + acc, 0) : 0;
    }

    rewardPerMonth(transactions: any) {
        // let last3MonthRewardsInDesc = [];
        // for(let i=0; i<3; i++) {
        //     let filteredList = transactions.filter((trans: any) => trans.transactionDate.getMonth() == (new Date).getMonth() - i );
        //     last3MonthRewardsInDesc[i] = filteredList.reduce((acc: any, key)=>key.bill+acc,0);
        // }

        let obj: any = {

        };
        console.log(transactions.length);
        for(let i=0; i < transactions.length; i++) {
            let points = this.calculateRewards(transactions[i].bill);
            let month = new Date(transactions[i].date).getMonth() +1;
            if(!obj[transactions[i].customer]){
                obj[transactions[i].customer] = {total: 0};
            }

            if(!obj[transactions[i].customer][month]) {
                obj[transactions[i].customer][month] = 0;
            }
            
            obj[transactions[i].customer][month] += points;
            obj[transactions[i].customer].total += points; 
        }
        return obj;
    }

    getUsers(transactions: any) {
        const mySet = new Set();
        transactions.forEach((item: any) => {
            mySet.add(item.customer);
        });
        return Array.from(mySet);
    }
}