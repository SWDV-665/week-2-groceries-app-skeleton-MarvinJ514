import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public InputDialogService: InputDialogServiceProvider, public SocialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad(){
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  removeItem(id){
    this.dataService.removeItem(id);
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

  shareItem(item, index) {
    console.log("Sharing item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Sharing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + "- Brand: " + item.brand + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";
    this.SocialSharing.share(message,subject).then(() => {
      
      console.log("Shared successfully")
    }).catch((error) => {
      
      console.error("Error while sharing", error);
    });

  }

  editItem(item, index) {
    console.log("editing item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Editing Item - " + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.InputDialogService.showPrompt(item, index);
  }
  
  addItem(item) {
    console.log("adding item");
    this.InputDialogService.showPrompt(item);
  }
 
}
