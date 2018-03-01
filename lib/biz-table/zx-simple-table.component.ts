import { Component, Inject, Input, Output, OnDestroy, OnInit, OnChanges, SimpleChanges, EventEmitter, Renderer2, ElementRef, TemplateRef, SimpleChange, QueryList, ViewChildren, AfterViewInit, ContentChildren, ContentChild, Optional } from '@angular/core';
import { _HttpClient, CNCurrencyPipe, MomentDatePipe, YNPipe, ModalHelper, ALAIN_I18N_TOKEN, AlainI18NService } from '@delon/theme';
import { DecimalPipe } from '@angular/common';
import { ACLService } from '@delon/acl';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SimpleTableColumn, SimpleTableChange, CompareFn, SimpleTableSelection, SimpleTableFilter, SimpleTableData, SimpleTableButton, STExportOptions, ResReNameType } from './interface';
import { SimpleTableConfig } from './simple-table.config';
import { deepGet, deepCopy } from '../utils/utils';
import { SimpleTableRowDirective } from './simple-table-row.directive';
import { SimpleTableExport } from './simple-table-export';
import { SimpleTableComponent } from './simple-table.component';


@Component({
    selector: 'simple-table',
    templateUrl: './simple-table.component.html',
    styleUrls: [ './simple-table.less' ],
    providers: [ SimpleTableExport, CNCurrencyPipe, MomentDatePipe, YNPipe, DecimalPipe,SimpleTableConfig ]
})
export class ZxSimpleTableComponent extends SimpleTableComponent {

}    