import { Component, inject, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-destroy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-destroy.component.html',
  styleUrl: './modal-destroy.component.css'
})
export class ModalDestroyComponent {
  Open = false;
  @Input() articleId!: number;

  article!: number 
  articleService: ArticleService = inject(ArticleService);
  
  isOpen : boolean = false
  articleservice : ArticleService = inject(ArticleService)


  openModal(articleId : number){
    this.article = articleId;
    this.Open = true;

  }
  supprimer(){
    this.articleService.destroy(this.article);
    this.articleservice.deleteMessage('Article Supprimé avec succès !');
    this.Open = false;
  }
  
  closeModal(event?: Event){
    if(event){
      event.stopPropagation();
    }
    this.Open = false;
  
  }
  

  
 
  close(){
    this.isOpen = false
  }
}
