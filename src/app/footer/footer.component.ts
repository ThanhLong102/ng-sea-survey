import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer mb-4 mt-2">
      Copyright 2022 by SeABank. All rights reserved.
    </footer>
  `,
  styles: [
    `
      .footer {
        line-height: 2;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    `,
  ],
})
export class FooterComponent implements OnInit {
  version = VERSION.full;

  constructor() {}

  ngOnInit() {}
}
