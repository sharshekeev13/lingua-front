import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/translate.service';
import { Subject, debounceTime } from 'rxjs';
import { Language, languages } from '../../models/languages.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private translateService : TranslateService) {}




  languagesList : Language[] = languages;
  selectedLanguage = 'English';
  dropdownOpen = false;

  toTranslate = ''
  targetLanguage = 'Начните писать!'
  translatedText = ''
  isLoading = false;
  private inputTextSubject = new Subject<string>();
  private inputTextSubscription: any;
  ngOnInit(): void {
    this.inputTextSubscription = this.inputTextSubject.pipe(
      debounceTime(300) // Debounce time in milliseconds
    ).subscribe(text => {
      this.translateText(text);
    });
  }

  ngOnDestroy(): void {
    if (this.inputTextSubscription) {
      this.inputTextSubscription.unsubscribe();
    }
  }

  onKeyUp() {
    this.inputTextSubject.next(this.toTranslate);
  }


  translateText(text : string){
    this.isLoading = true
    if(text !== ''){
      this.translateService.translate(text, this.selectedLanguage.toLowerCase()).subscribe({
        next : (data) => {
          this.isLoading = false
          console.log(data)
          this.targetLanguage = data.selected
          this.translatedText = data.text
        },
        error : (err) => {
          console.log(err)
          this.isLoading = false
        }
      })
    }else {
      this.targetLanguage = 'Начните писать!'
      this.isLoading = false
      this.translatedText = ''
    }
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeLanguage(language: string): void {
    this.selectedLanguage = language;
    this.toggleDropdown();
    if(this.toTranslate !== ''){
      this.translateText(this.toTranslate)
    }
  }

}
