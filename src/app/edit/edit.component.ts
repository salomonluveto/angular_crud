import { Component, inject, Input, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Article } from '../article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  article!: Article | undefined 
  articleService: ArticleService = inject(ArticleService);
  route:ActivatedRoute = inject(ActivatedRoute)
  articleid = -1
  
  
  isOpen : boolean = false
  articleservice : ArticleService = inject(ArticleService)

 
  editForm = new FormGroup({ // créé pour controler le formulaire

    id : new FormControl(0), 
    title: new FormControl(""),
    price: new FormControl(0),
    description:new FormControl(""),
  
  })
  ngOnInit(){
    this.articleid = Number(this.route.snapshot.params['id'])// Number permet de convertir en nombre
    this.article = this.articleService.getOne(this.articleid)
    
   this.editForm = new FormGroup({ // créé pour controler le formulaire

    id : new FormControl(this.article?.id??0),
    title: new FormControl(this.article?.title??""),
    price: new FormControl(this.article?.price??0),
    description:new FormControl(this.article?.description??""),
  
  })
    
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
    
    
    this.isOpen = true
  }
  close(){
    this.isOpen = false
  }
}
