import { Component, ViewContainerRef, ChangeDetectorRef, ComponentRef, ViewChild, HostBinding, Injector } from '@angular/core';
import { SimpleChanges, OnDestroy, OnInit, DoCheck } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema, FormProperty } from '../biz-form';
import { SimpleTableColumn, SimpleTableButton, SimpleTableFilter, SimpleTableComponent } from '../biz-table';
import { BizQueryService } from './biz-query.service';
import { BizQueryComponent } from './biz-query.component';
import { ZxTreeComponent } from '../my-tree';

import { ITreeOptions } from 'angular-tree-component';

@Component({
    selector: 'biz-tree-table',
    template: `
    <div class="mb-md">
        <my-simple-form #myQueryForm [layout]="queryForm.layout"
            [schema]="queryForm.schema"
            [model]="queryForm.model"
            [actions]="actions">
        </my-simple-form>
    </div>
    <div nz-row [nzGutter]="24">
        <div nz-col [nzXl]="navTree.nzXl" [nzLg]="navTree.nzLg" [nzMd]="navTree.nzMd" [nzSm]="navTree.nzSm" [nzXs]="navTree.nzXs">
            <zx-tree #myNavTree tree-id="menuTree2" (nodeClick)="onTreeNodeClick($event)" has-checkbox="false" key-title="name" key-id="nodeId" key-pid="parentId" class="tree"></zx-tree>
        </div>
        <div nz-col [nzXl]="24 - navTree.nzXl" [nzLg]="24 - navTree.nzLg" [nzMd]="24 - navTree.nzMd" [nzSm]="16" [nzXs]="24">
            <my-simple-table #myDataTable [data]="dataTable.dataUrl" [extraParams]="queryParams" [columns]="dataTable.columns"
                [resReName]="dataTable.resReName" showTotal="dataTable.showTotal" [ps]="dataTable.pageSize" >
            </my-simple-table>
        </div>
    </div>
    `,
    providers: []
})
export class BizTreeTableComponent extends BizQueryComponent implements OnInit, DoCheck , OnDestroy {
    
    @ViewChild('myNavTree')
    myNavTree: ZxTreeComponent;

    navTree: any = {
        nzXs:18,
        nzSm:12,
        nzMd:6,
        nzLg:5,
        nzXl:4,
        dataUrl: ''
    };

    selectNodeId:string = "0";

    constructor(injector: Injector) {
        super(injector);
        //
        console.log("BizTreeTableComponent init ..............");
    }


    //     
    onPageInit(resultData: any) {
        //
        super.onPageInit(resultData);

        if (resultData["navTree"]){
            
            Object.keys(resultData["navTree"]).forEach((propKey: string) => {
                this.navTree[propKey] = resultData["navTree"][propKey];
            });
            
            if (this.navTree.dataUrl) {
                this.navTree.dataUrl = this.bizService.formatUrl(this.navTree.dataUrl);
            }    
            // 重新载入树的节点数据
            this.myNavTree.loadTree(this.navTree.dataUrl);
        }
    }

    onTreeNodeClick(nodeId:string) {
        //console.log("selected node :" + nodeId);
        this.activatedRoute.snapshot.data['parentId'] = nodeId;
        this.queryParams['parentId'] = nodeId;
        this.selectNodeId = nodeId;        

        //console.log("queryParams", this.queryParams);
        // 表格依据查询参数重新载入数据
        this.myDataTable.load(1);
        return false;
    }

    onAddNew(params?: any): void {
        if (!params){
            params = {};
        }
        params.parentid =  this.selectNodeId;
        return super.onAddNew(params);
    }    
}
