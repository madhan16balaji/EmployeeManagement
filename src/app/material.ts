import { NgModule } from '@angular/core';
import { 
    MatIconModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    imports: [ 
        MatInputModule, MatFormFieldModule, MatIconModule, 
        MatToolbarModule, MatButtonModule, MatDialogModule 
    ],
    exports: [ 
        MatInputModule, MatFormFieldModule, MatIconModule, 
        MatToolbarModule, MatButtonModule, MatDialogModule 
    ],
})
export class MaterialModule { }