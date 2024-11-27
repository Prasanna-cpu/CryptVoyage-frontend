import React, {useEffect, useState} from 'react';

import ReactApexChart from "react-apexcharts"
import {Button} from '../../components/ui/button';
import {useDispatch, useSelector} from "react-redux";
import {fetchMarketChart} from "../../State/Coin/Action.ts";

interface StockChartProps {
    coinId?: string
}

const StockChart: React.FunctionComponent = ({coinId}: StockChartProps) => {


    const [activeLabel, setActiveLabel] = useState<string>("1 Day")

    const {coin,auth}=useSelector(store=>store)
    console.log("Coin in stock chart", coin)


    const timeSeries = [
        {
            keyword: "DIGITAL_CURRENCY_DAILY",
            key: "Time Series (Daily)",
            label: "1 Day",
            value: 1
        },
        {
            keyword: "WEEKLY_CURRENCY_DAILY",
            key: "Weekly Series (Weekly)",
            label: "1 Week",
            value: 7
        },
        {
            keyword: "MONTHLY_CURRENCY_DAILY",
            key: "Monthly Series (Monthly)",
            label: "1 Month",
            value: 28
        }
    ]

    const series = [
        {
            data: coin.marketChart.data,
        },
    ];

    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        annotations: {
            // your annotations
        },
        dataLabels: {
            enabled: false,
        },

        xaxis: {
            type: "datetime",
            //   min: new Date('01 Dec 2023').getTime(),
            tickAmount: 6,
        },
        colors: ["#758AA2"], // Line color
        markers: {
            colors: ["#fff"], // Dot color
            strokeColors: "#fff", // Dot border color
            strokeWidth: 1, // Dot border width
            size: 0,
            style: "hollow",
        },
        tooltip: {
            theme: "dark",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: "#47535E", // Color of the grid lines
            strokeDashArray: 4, // Width of the grid lines
            show: true,
        },
    }

    function handleActiveLabelChange(value: string) {
        setActiveLabel(value)
    }

    const dispatch: any = useDispatch()
    const [activeType, setActiveType] = useState(timeSeries[0]);

    useEffect(() => {

        if (coinId) {
            dispatch(fetchMarketChart({ coinId, days: activeType.value,jwt:localStorage.getItem("jwt") || auth.jwt }));
        }
    }, [coinId, activeType.value, dispatch, auth.jwt]);

    return (
        <div>
            <div>
                {timeSeries.map((item) => (
                    <Button
                        onClick={() => setActiveType(item)}
                        key={item.label}
                        variant={activeType.label !== item.label ? "ghost" : "outline"}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div id={"chart-timelines"}>
                <ReactApexChart
                    options={options}
                    series={series}
                    type={"area"}
                    height={450}
                />
            </div>
        </div>
    );
};

export default StockChart;
