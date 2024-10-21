import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalCreateComponent } from "../modal-create/modal-create.component";
import { ModalEditComponent } from "../modal-edit/modal-edit.component";
import { ModalDestroyComponent } from "../modal-destroy/modal-destroy.component";
import $ from 'jquery';
import 'datatables.net'; 


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [NgFor, RouterLink, ReactiveFormsModule, ModalCreateComponent, NgIf, ModalEditComponent, ModalDestroyComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {

@Input() article !: Article
  articles: Article[] = [];
  message: string | null = null;
  message_update: string | null = null;
  message_delete: string | null = null;
  isOpen !: boolean
  articleService: ArticleService = inject(ArticleService);
   supForm = new FormGroup({
    id : new FormControl(0), 
   }
   )
   

   ngOnInit(){
    try {

      setTimeout(() => {
        $('#datatableexemple').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 15],
        });
    }, 1); 
      this.articles = this.articleService.getAll();
      this.articleService.message$.subscribe((msg) => {
        this.message = msg;
  
        // Optionnel : Effacer le message après un certain temps
        if (msg) {
          setTimeout(() => {
            this.articleService.clearMessage();
          }, 3000); // Efface le message après 3 secondes
        }
      });

      this.articleService.update$.subscribe((msg) => {
        this.message_update = msg;
  
        // Optionnel : Effacer le message après un certain temps
        if (msg) {
          setTimeout(() => {
            this.articleService.clearupdateMessage();
          }, 3000); // Efface le message après 3 secondes
        }
      });

      this.articleService.delete$.subscribe((msg) => {
        this.message_delete = msg;
  
        // Optionnel : Effacer le message après un certain temps
        if (msg) {
          setTimeout(() => {
            this.articleService.cleardeleteMessage();
          }, 3000); // Efface le message après 3 secondes
        }
      });
    }
  
    
      
     catch (error) {
      console.error('Error fetching articles:', error);
    } 
  }



  @ViewChild('edit_modal') editModal!: any;
  @ViewChild('destroy_modal') destroyModal !: any;
  selectedArticleId!: number; // Variable pour stocker l'ID de l'article

  openModal(event: MouseEvent, articleId: number) {
    event.preventDefault(); // Empêche la navigation
    this.selectedArticleId = articleId; // Stocke l'ID de l'article
    
    this.editModal.openModal(articleId); // Ouvre le modal  

}
openModal_sup(event: MouseEvent, articleId: number) {
  event.preventDefault(); // Empêche la navigation
  this.selectedArticleId = articleId; // Stocke l'ID de l'article
  
  this.destroyModal.openModal(articleId); // Ouvre le modal  

}
close(){
  this.isOpen = false
}


}
