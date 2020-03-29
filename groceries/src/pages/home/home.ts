import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      brand: "Silk",
      quantity: 1
    },
    {
      name: "Cookies",
      brand: "Oreos",
      quantity: 2
    },
    {
      name: "Chips",
      brand: "Doritos",
      quantity: 3
    },
    {
      name: "Tuna",
      brand: "Bumble Bee",
      quantity: 10
    },
    {
      name: "Toilet Paper",
      brand: "Charmin",
      quantity: 100
    },
];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  removeItem(item, index){
    console.log("remove item -", item, index);
    const toast = this.toastCtrl.create({
      message: "Removing item - " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.items.splice(index,1);
  }
  addItem(){
    console.log("adding item");
    this.showAddItemPrompt();
  }
  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter item details...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'brand',
          placeholder: 'Brand'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }
}
