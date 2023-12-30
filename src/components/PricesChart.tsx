import { FlatList, Text, View } from "react-native";
import Price from "../model/Price";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { VictoryChart, VictoryTheme, VictoryLine, VictoryLegend, VictoryCursorContainer, VictoryAxis, VictoryLabel, VictoryScatter } from "victory-native";
import { PriceDetail } from "../types";


type DataEntry = {
    // x: Date,
    x: string,
    // x: number,
    y: number | null
}

type Legend = {
    name: string; symbol: { fill: string; type: string; };
}

function dateStrFormat(rawDateStr: string): string {
    // const strNum: string = num.toString()
    const strInt = rawDateStr.slice(0, 8)
    const dateString = strInt.slice(6, 8) + '/' + strInt.slice(4, 6) + '/' + strInt.slice(0, 4)
    return dateString
}

function dateStrToNum(dateStr: string) {
    const date = new Date(dateStr)
    return Number(''
    + date.getFullYear()
    + (date.getMonth() + 1).toString().padStart(2, '0')
    + date.getDate().toString().padStart(2, '0')
    )
}

function dateObjToNum(dateObj: Date) {
    const date = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth()+1).toString().padStart(2, '0')
    const year = dateObj.getFullYear().toString()
    const dateNum = Number(year + month + date)
    console.log('datenum',dateNum);    
    return dateNum
}

function dateObjToRawStr(dateObj: Date) {
    const date = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth()+1).toString().padStart(2, '0')
    const year = dateObj.getFullYear().toString()
    const dateStr = year+month+date
    return dateStr
}


function dateStrToObj(dateStr: string) {
    // const strNum: string = dateNum.toString()   
    console.log(dateStr) 
    const strInt = dateStr.slice(0, 8)
    const dateString = strInt.slice(0, 4) + '-' + strInt.slice(4, 6) + '-' + strInt.slice(6, 8)
    console.log(dateString);
    const dateObj = new Date(dateString)
    // console.log(dateObj);    
    return dateObj
}

// function createArrayInRange(start: number, end: number) {
//     return Array.from({ length: end - start + 1 }, (_, index) => start + index);
// }

function dateStrsInRange(start: string, end: string) {
    const curDate = new Date(start)//dateStrToObj(start)
    const endDate = new Date(end)//dateStrToObj(end)

    console.log('datestrsinrange', start, end);
    
    console.log(curDate, endDate)

    const dates = []

    while (curDate <= endDate) {
        dates.push(dateObjToRawStr(curDate))
        curDate.setDate(curDate.getDate()+1)
    }
    console.log(dates);
    
    return dates
}



function PricesChart(props: { priceDetails: PriceDetail }) {

    const { priceDetails } = props
    const prices = priceDetails.prices
    const storeMap = priceDetails.storeMap

    const [datasets, setDatasets] = useState<{ [key: string]: DataEntry[] }>(
        {
            "a": [
                {
                    // 'x': 0,
                    // 'x': new Date('2023-01-01'),
                    'x': '20230101',
                    "y": null
                }
            ]
        }
    );


    const [count, setCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [legend, setLegend] = useState<Legend[]>();
    const [limits, setLimits] = useState(
        {
            maxCost: 0,
            // earliestDate: '20231201',
            // latestDate: '20231213'
            earliestDate: 'Thu Dec 21 2023',
            latestDate: 'Thu Dec 21 2023'
        }
    );


    // const screenWidth = Dimensions.get("window").width;


    useEffect(() => {

        if (prices.length != 0) {
            const sortedPrices = prices.sort((a, b) => {
                if (Date.parse(a.noted_at) < Date.parse(b.noted_at)) {
                    return -1;
                }
                if (Date.parse(a.noted_at) > Date.parse(b.noted_at)) {
                    return 1;
                }
                return 0;
            });

            const maxCost = prices.reduce((max, obj) => {
                return obj.cost > max ? obj.cost : max;
            }, -Infinity) + 2

            

            const earliestDate = prices.reduce((earliest, obj) => {
                return Date.parse(obj.noted_at) < Date.parse(earliest.noted_at) ? obj : earliest;
              }, prices[0]).noted_at;

              console.log('earliest ', earliestDate)

            const latestDate = prices.reduce((latest, obj) => {
                return Date.parse(obj.noted_at) > Date.parse(latest.noted_at) ? obj : latest;
            }, prices[0]).noted_at;

            console.log('latest ', latestDate)
            
            setLimits({
                maxCost: maxCost,
                earliestDate: earliestDate,
                latestDate: latestDate
                // earliestDate: dateStrToNum(earliestDate),
                // latestDate: dateStrToNum(latestDate)
            })

            const groupedByStore: { [key: string]: DataEntry[] } = sortedPrices.reduce(
                (result, obj) => {
                    const key: string = obj.store_id;

                    console.log('noted at', obj.noted_at)

                    if (!result[key]) {
                        result[key] = [];
                    }

                    const date = new Date(obj.noted_at)
                    // console.log(date)

                    result[key].push({
                        // x: Number('' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()),
                        // x: dateObjToNum(date),
                        // x: date,
                        x: dateObjToRawStr(date),
                        y: obj.cost
                    });

                    return result;
                },
                {} as { [key: string]: DataEntry[] }
            );



            const storeLegend = [...new Set(sortedPrices.map(price => price.store_id))]

            const finalLegend = []
            for (let i = 0; i < storeLegend.length; i++) {
                finalLegend.push(
                    {
                        name: storeMap[storeLegend[i]].store_name,
                        symbol: {
                            fill: storeMap[storeLegend[i]] ? storeMap[storeLegend[i]].store_colour : 'red',
                            type: "minus"
                        }
                    }
                )
            }

            setDatasets(groupedByStore)
            setLegend(finalLegend)


            console.log('data is set, ')
            console.log(groupedByStore)

            setIsLoaded(true)
        }


    }, [prices, count])


    return (
        <View>
            <Text>Prices Chart</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ y: [0, limits.maxCost] }}
            >

                <VictoryAxis
                    fixLabelOverlap
                    tickFormat={(x) => dateStrFormat(x)}
                    tickValues={dateStrsInRange(limits.earliestDate, limits.latestDate)}
                    style={{
                        grid: { stroke: 'grey' },
                    }}
                    scale='time'
                />
                <VictoryAxis dependentAxis />

                {
                    Object.entries(datasets).map(([store_id, dataset]) =>
                        <VictoryLine
                            key={store_id}
                            style={{
                                data: { stroke: storeMap[store_id] ? storeMap[store_id].store_colour : 'red' },
                                parent: { border: "1px solid #ccc" },
                            }}
                            data={dataset}
                            sortKey='x'
                        />
                    )
                }
                {
                    Object.entries(datasets).map(([store_id, dataset]) =>
                        <VictoryScatter
                            key={store_id}
                            data={dataset}
                        />
                    )
                }
                < VictoryLegend
                    data={legend}
                />
            </VictoryChart>
        </View >
    )
}

export default PricesChart
