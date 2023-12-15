import { Text, View } from "react-native";
import Price from "../model/Price";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";



function PricesChart(props: { prices: Price[] }) {

    const { prices } = props

    const [data, setData] = useState({
        labels: ['a'],
        datasets: [
            {
                data: [0]
            }
        ],
        legend: ['a']
    });
    const [isLoaded, setIsLoaded] = useState(false);

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };



    // useEffect(() => {
        useLayoutEffect(()=> {

        const sortedPrices = prices.sort((a, b) => {
            if (Date.parse(a.noted_at) < Date.parse(b.noted_at)) {
                return -1;
            }
            if (Date.parse(a.noted_at) > Date.parse(b.noted_at)) {
                return 1;
            }
            return 0;
        });

        const allDates: string[] = sortedPrices.map(price => price.noted_at)
        // const allDates: string[] = [...new Set(prices.map(price => price.noted_at))]

        const costsByStore: { [key: string]: number[] } = sortedPrices.reduce(
            (result, obj) => {
                const key: string = obj.store_id;

                // Check if the key already exists in the result object
                if (!result[key]) {
                    // If the key doesn't exist, create a new array for that key
                    result[key] = [];
                }

                // Push the current object to the array associated with the key
                result[key].push(obj.cost);

                return result;
            },
            {} as { [key: string]: number[] }
        );

        console.log(costsByStore);

        console.log(allDates)


        const datasets = []
        for (const [key, value] of Object.entries(costsByStore)) {
            datasets.push({ data: value })
        }

        console.log(datasets)

        const legend = sortedPrices.map(price => price.store_id)



        setData({
            labels: allDates,
            datasets: datasets,
            legend: legend
        })

        setIsLoaded(true)


    }, [])



    console.log(data)

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