import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataSerivce: GroceriesServiceProvider, public InputDialogSerivce: InputDialogServiceProvider) {

  }

  loadItems(){
    return this.dataSerivce.getItems();
  }

  removeItem(item, index) {
    console.log("remove item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.dataSerivce.removeItem(index);
  }
  editItem(item, index) {
    console.log("editing item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Editing Item - " + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.InputDialogSerivce.showPrompt(item, index);
  }
  
  addItem() {
    console.log("adding item");
    this.InputDialogSerivce.showPrompt();
  }
 
}
