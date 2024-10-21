import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [
    {
        path:'',
        component:ArticleListComponent,
        title:"Articles"
        },
        {
            path:'create',
            component:CreateComponent,
            title:"Enregistrement"
            },
            {
                path: 'edit/:id',
                component : EditComponent,
                title : "Modification"
            },
         
            
];
