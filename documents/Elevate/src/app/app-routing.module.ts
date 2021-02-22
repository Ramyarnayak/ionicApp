import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/home/home.module')).HomeModule as NgModule,
    path: '',
    pathMatch: 'full'
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/article/article.module'))
      .ArticleModule as NgModule,
    path: 'article',
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/search/search.module'))
      .SearchModule as NgModule,
    path: 'search',
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/general-template/general-template.module'))
      .GeneralTemplateModule as NgModule,
    path: 'content',
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/quiz/quiz.module')).QuizModule as NgModule,
    path: 'quiz',
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/financial-soln/fnsn.module')).FnSnModule as NgModule,
    path: 'financial-solutions',
  },
  {
    loadChildren: async (): Promise<NgModule> => (await import('./content/knowledge-center/knowledge-center.module'))
      .KnowledgeCenterModule as NgModule,
    path: 'knowledge-center',
  },
  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
