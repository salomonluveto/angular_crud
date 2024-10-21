import { Component,inject, Input } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';

import { NgIf } from '@angular/common';
import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
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
    

    this.isOpen = true
  }
  close(){
    this.isOpen = false
  }
    
}
