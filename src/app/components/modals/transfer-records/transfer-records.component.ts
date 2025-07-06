import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer-records.component.html',
  styleUrl: './transfer-records.component.scss',
})
export class TransferRecordsComponent {
  items = [
    {
      name: 'Transfer 01',
      date: '12 Oct, 2024',
      status: 'Failed',
      records: [
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
      ],
    },
    {
      name: 'Transfer 02',
      date: '12 Oct, 2024',
      status: 'Failed',
      records: [
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
      ],
    },
    {
      name: 'Transfer 03',
      date: '12 Oct, 2024',
      status: 'Failed',
      records: [
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
      ],
    },
    {
      name: 'Transfer 04',
      date: '12 Oct, 2024',
      status: 'Failed',
      records: [
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
      ],
    },
    {
      name: 'Transfer 05',
      date: '12 Oct, 2024',
      status: 'Failed',
      records: [
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
        {
          name: 'NIP Commission|Ab|01032...',
          date: '20th July, 2025. 20:48pm',
          status: 'Failed',
          amount: '-₦15,000.00',
        },
      ],
    },
  ];
  activeIndex: number | null = null;

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
