import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SearchComponent } from './features/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { HomeComponent } from './features/home/home.component';
import { SkeletonSearchArticleCardComponent } from './shared/skeleton-search-article-card/skeleton-search-article-card.component';
import { SkeletonHomeArticleCardComponent } from './shared/skeleton-home-article-card/skeleton-home-article-card.component';
import { CommonModule } from '@angular/common';
import { AppHomeArticleCardComponent } from './shared/home-article-card/home-article-card.component';
import { SearchArticleCardComponent } from './shared/search-article-card/search-article-card.component';
import { ErrorComponent } from './shared/error/error.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { OurSourcesComponent } from './features/our-sources/our-sources.component';
import { SourceCardComponent } from './shared/source-card/source-card.component';
import { SkeletonSourceCardComponent } from './shared/skeleton-source-card/skeleton-source-card.component';
import { NewsService } from './core/services/news.service';
import { NewsFilterService } from './core/services/news-filter.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    SkeletonSearchArticleCardComponent,
    SkeletonHomeArticleCardComponent,
    AppHomeArticleCardComponent,
    SearchArticleCardComponent,
    ErrorComponent,
    OurSourcesComponent,
    SourceCardComponent,
    SkeletonSourceCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    NewsService,
    NewsFilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
