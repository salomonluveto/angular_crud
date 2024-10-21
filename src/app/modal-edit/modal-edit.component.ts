import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent  {
  Open = false;
  @Input() articleId!: number;

  article!: Article | undefined 
  articleService: ArticleService = inject(ArticleService);

  
  isOpen : boolean = false
  articleservice : ArticleService = inject(ArticleService)

 
  editForm = new FormGroup({ // créé pour controler le formulaire

    id : new FormControl(0), 
    title: new FormControl(""),
    price: new FormControl(0),
    description:new FormControl(""),
  
  })

  openModal(articleId : number){
    this.article = this.articleService.getOne(articleId)
    this.editForm = new FormGroup({ // créé pour controler le formulaire

      id : new FormControl(this.article?.id??0),
      title: new FormControl(this.article?.title??""),
      price: new FormControl(this.article?.price??0),
      description:new FormControl(this.article?.description??""),
    
    })
    this.Open = true;


  }
  
  closeModal(event?: Event){
    if(event){
      event.stopPropagation();
    }
    this.Open = false;
  
  }
  

  
  async update(){
    this.articleservice.update(
    this.editForm.value.id??0,
    this.editForm.value.title??"",
    this.editForm.value.price??0,
    this.editForm.value.description??"",
     
    )
    this.editForm =new FormGroup({
      id : new FormControl(0),
      title: new FormControl(''),
      price: new FormControl(0),
    description:new FormControl(''),
     
    })

    
    this.articleservice.updateMessage('Article Modifié avec succès !');
    this.isOpen = true
  }
  close(){
    this.isOpen = false
  }
}
