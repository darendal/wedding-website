import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {


  amazonRegistry = 'https://www.amazon.com/wedding/brendan-ware-emily-buchroeder-cleveland-september-2019/registry/1UZKIENGYWMGI';
  constructor() { }

  ngOnInit() {
  }

}
