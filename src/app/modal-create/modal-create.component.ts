import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from "../create/create.component";
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [CommonModule, CreateComponent,ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css'
})
export class ModalCreateComponent {
  Open = false;
  openModal(){
    this.Open = true;
  }
  closeModal(event?: Event){
    if(event){
      event.stopPropagation();
    }
    this.Open = false;
  
  }
  
  isOpen : boolean = false
  @Input() article !: Article
  articles: Article[] = [];
  articleservice : ArticleService = inject(ArticleService)
  applyForm = new FormGroup({ // créé pour controler le formulaire
    title: new FormControl(''),
    price: new FormControl(0),
    description:new FormControl(''),
  
  })
  
  async save(){
    this.articleservice.store(
    this.applyForm.value.title??"",
    this.applyForm.value.price??0,
    this.applyForm.value.description??"",
     
    )
    this.applyForm = new FormGroup({
      title: new FormControl(''),
      price: new FormControl(0),
    description:new FormControl(''),
     
    })
    
    this.articleservice.notifyMessage('Article enregistré avec succès !');
    this.isOpen = true
  }
  close(){
    this.isOpen = false
  }
    
}
