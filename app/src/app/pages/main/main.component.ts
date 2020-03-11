import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { Tree } from 'primeng/tree/tree';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('expandingTree')
  expandingTree: Tree;
  treeP1: TreeNode;
  treeP2N1: TreeNode;
  treeP2N2: TreeNode;
  treeP3N1: TreeNode;
  treeP3N2: TreeNode;
  treeP3N3: TreeNode;
  treeP3N4: TreeNode;
  filesTree: TreeNode[];
  selectedFile: TreeNode;

  constructor() {
  }

  ngOnInit(): void {
    this.treeP3N1 = { label: 'root', parent: this.treeP2N1 };
    this.treeP3N2 = { label: 'branch3', parent: this.treeP2N1 };
    this.treeP3N3 = { label: 'branch4', parent: this.treeP2N2 };
    this.treeP3N4 = { label: 'branch4', parent: this.treeP2N2 };
    this.treeP2N1 = { label: 'branch2', parent: this.treeP1, children: [this.treeP3N1, this.treeP3N2], expanded: true };
    this.treeP2N2 = { label: 'branch2', parent: this.treeP1, children: [this.treeP3N3, this.treeP3N4], expanded: true };
    this.treeP1 = { label: 'root', children: [this.treeP2N1, this.treeP2N2], expanded: true };
    this.filesTree = [
      this.treeP1, this.treeP2N1, this.treeP2N2, this.treeP3N1, this.treeP3N2, this.treeP3N3, this.treeP3N4
    ];
  }

}
