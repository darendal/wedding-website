import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {


  amazonRegistry = 'https://www.amazon.com/wedding/brendan-ware-emily-buchroeder-cleveland-september-2019/registry/1UZKIENGYWMGI';
  frontgateRegistry = 'https://www.frontgate.com/gr/8162535';
  dillardsRegistry = 'https://www.dillards.com/registry/BRENDANWARE/132323940';
  surLaTable = 'https://www.surlatable.com/registry/giftRegistryList.jsp?id=2002485685585';
  constructor() { }

  ngOnInit() {
  }

}
