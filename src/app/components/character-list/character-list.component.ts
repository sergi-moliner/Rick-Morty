import { Component, OnInit, HostListener } from '@angular/core';
import { RickMortyService } from '../../services/rick-morty.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  allCharacters: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }


  loadCharacters(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.rickMortyService.getCharacters(this.currentPage).subscribe(response => {
      this.characters = [...this.characters, ...response.results];
      this.allCharacters = [...this.characters];
      this.totalPages = response.info.pages;
      this.isLoading = false;
    });
  }

  searchCharacters(): void {
    if (this.searchTerm === '') {
      this.characters = [...this.allCharacters];
    } else {
      this.isLoading = true;
      this.rickMortyService.searchCharactersByName(this.searchTerm).subscribe(response => {
        this.characters = response.results;
        this.isLoading = false;
      }, error => {
        this.characters = [];
        this.isLoading = false;
      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos >= max && this.currentPage < this.totalPages && !this.isLoading && this.searchTerm === '') {
      this.currentPage++;
      this.loadCharacters();
    }
  }
}
