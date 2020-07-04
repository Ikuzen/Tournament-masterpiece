import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private messageService: MessageService, private toastService: ToastService) { }
  ngOnInit() {
  }

  showSuccess(summary: string, message: string) {
    this.toastService.success(summary, message);
  }
  
  showError(summary: string, message: string) {
    this.toastService.showError(summary, message);
  }

  showInfo() {
    this.toastService.showInfo();
  }

  showWarn() {
    this.toastService.showWarn();
  }


  showCustom() {
    this.toastService.showCustom();
  }

  showTopLeft() {
    this.toastService.showTopLeft();
  }

  showTopCenter() {
    this.toastService.showTopCenter();
  }

  showConfirm() {
    this.toastService.showConfirm();
  }

  showMultiple() {
    this.toastService.showMultiple();
  }

  onConfirm() {
    this.toastService.onConfirm();
  }

  onReject() {
    this.toastService.onReject();
  }

  clear() {
    this.toastService.clear();
  }
}
