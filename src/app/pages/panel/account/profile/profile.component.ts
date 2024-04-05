import { Component, OnInit, ViewChild } from '@angular/core';
import { AgChartsAngular, } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [AgChartsAngular, NzSpaceModule, NzButtonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    @ViewChild(AgChartsAngular) agCharts!: AgChartsAngular;
    chartOptions: AgChartOptions;
    chartType: string = "bar";
    categories: Category[] = [];
    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private userService: UserService
    ) {
        this.chartOptions = {
            // Data: Data to be displayed in the chart
            data: [],
            // Series: Defines which chart type and data to use
            series: [{ type: 'bar', xKey: 'type', yKey: 'count' }],
            legend: {
                position: 'bottom', // 'top', 'right', 'left',
            },
            animation: {
                duration: 500,
            },
        };
    }
    ngOnInit(): void {
        this.getDataChart();
    }

    getDataChart() {
        this.productService.list().subscribe(q => {
            this.chartOptions.data?.push({ type: 'محصول ها', count: q.length })
            this.updateChart()
        });
        this.categoryService.list().subscribe(q => {
            this.chartOptions.data?.push({ type: 'دسته ها', count: q.length })
            this.updateChart()
        });

        this.userService.list().subscribe(q => {
            this.chartOptions.data?.push({ type: 'کاربر ها', count: q.length },)
            this.updateChart()
        });
    }

    updateChart() {
        AgCharts.updateDelta(this.agCharts.chart!, this.chartOptions)
    }

    changeChartType(type: string) {
        this.chartType = type;
        switch (type) {
            case "pie":
                this.chartOptions.series = [{ type: "pie", angleKey: "count", legendItemKey: "type" }];
                break;
            case "donut":
                this.chartOptions.series = [{
                    type: "donut", calloutLabelKey: "type", angleKey: "count", innerRadiusRatio: 0.7,
                }];
                break;
            default:
                this.chartOptions.series = [{ type: 'bar', xKey: 'type', yKey: 'count' }];

        }
        this.updateChart()
    }
}
