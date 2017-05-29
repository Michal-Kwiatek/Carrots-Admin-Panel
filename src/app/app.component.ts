import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="app__title">
      Carrots - Admin Panel
    </h1>
    
    <div class="container">
      <div class="row createAndEdit">
        <new-profile></new-profile>
        <edit-profile></edit-profile>
      </div>
      
      <div class="row profilesTable">
        <table-profiles></table-profiles>
      </div>
      
    </div>
  `,
  styles: [`
    .app__title {
      text-align: center;
      padding: 5px;
      display: table;
      margin: 10px auto 50px auto;
      border-bottom: 1px solid black;
    }
    
    new-profile, edit-profile {
      min-width: 350px;
    }

    .createAndEdit {
      justify-content: space-around;
    }
    
    table-profiles {
       width: 100%;
    }

    table-profiles /deep/ table{
        margin-top: 50px;
    }

    @media (max-width: 420px) {
      new-profile, edit-profile {
        width: 98vw;
      }

      edit-profile {
        margin-top: 20px;
      }
    }
  `]
})
export class AppComponent {

}
