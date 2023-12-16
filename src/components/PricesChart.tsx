import { Text, View } from "react-native";
import Price from "../model/Price";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";



function PricesChart(props: { prices: Price[] }) {

    const { prices } = props

    const [data, setData] = useState<LineChartData>(
        // {
        //     labels: ['a'],
        //     datasets: [
        //         {
        //             data: [1, null, 3]
        //         },
        //         {
        //             data: [4, 5, 6]
        //         },

        //     ],
        //     legend: ['a', 'b']
        // }
        {
            "datasets": [
                {
                    "data": [14, 15, 16]
                },
                {
                    "data": [13, 11, 19, 14]
                }
            ],
            "labels": ["01-12", "02-12", "03-12", "05-12", "07-12"],
            "legend": ["Store 1", "Store 2"],
        }
    );

    const [isLoaded, setIsLoaded] = useState(false);

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };



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


            // Step 1: Group data by date and item_id
            const groupedData: { [key: string]: Price[] } = sortedPrices.reduce((acc, obj) => {
                const key = `${obj.noted_at}-${obj.store_id}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {} as { [key: string]: Price[] });



            // Step 2 and 3: Interpolate missing values
            const interpolatedData = Object.values(groupedData).flatMap((group) => {
                group.sort((a, b) => Date.parse(a.noted_at) - Date.parse(b.noted_at));
                const result = [];

                for (let i = 0; i < group.length; i++) {
                    result.push(group[i]);

                    if (i < group.length - 1) {
                        const currentDate = new Date(group[i].noted_at);
                        const nextDate = new Date(group[i + 1].noted_at);

                        let Difference_In_Time = nextDate.getTime() - currentDate.getTime();

                        // To calculate the no. of days between two dates
                        const daysDifference =
                            Math.round(Difference_In_Time / (1000 * 3600 * 24));

                        // const daysDifference = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

                        if (daysDifference > 1) {
                            // Interpolate missing values
                            const interpolatedCost =
                                (group[i + 1].cost + group[i].cost) / 2; // Average cost
                            for (let j = 1; j < daysDifference; j++) {
                                const interpolatedDate = new Date(
                                    currentDate.getTime() + j * 24 * 60 * 60 * 1000
                                ).toISOString().split('T')[0];
                                result.push({
                                    noted_at: interpolatedDate,
                                    cost: interpolatedCost,
                                    store_id: group[i].store_id,
                                });
                            }
                        }
                    }
                }

                return result;
            });

            console.log('interpolated ', interpolatedData);








            const allDates: string[] = interpolatedData.map(price => price.noted_at)


            const costsByStore: { [key: string]: number[] } = interpolatedData.reduce(
                (result, obj) => {
                    const key: string = obj.store_id;

                    if (!result[key]) {
                        result[key] = [];
                    }

                    result[key].push(obj.cost);

                    return result;
                },
                {} as { [key: string]: number[] }
            );

            console.log('costsbystore', costsByStore);

            console.log('alldates: ', allDates)


            const priceDatasets: Dataset[] = []
            for (const [key, value] of Object.entries(costsByStore)) {
                const singlePriceDataset: Dataset = {
                    data: value,
                    color: (opacity) => `rgb(0, 0, ${opacity * 255})`,
                }
                priceDatasets.push(singlePriceDataset)
            }

            console.log('pricedatasets', priceDatasets)

            const priceLegend = [...new Set(sortedPrices.map(price => price.store_id))]

            const newData: LineChartData = {
                labels: allDates,
                datasets: priceDatasets,
                legend: priceLegend
            }

            // setData(newData)

            console.log('newdata', newData)

            console.log('data after setting', data)
            console.log(data.datasets)

            console.log('data is set')

            setIsLoaded(true)
        }


    }, [prices])





    return (
        <View>
            <Text>Prices Chart</Text>
            {isLoaded && <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />}
        </View>
    )


}

export default PricesChart