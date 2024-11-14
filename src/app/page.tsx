"use client";
import { gql } from "@apollo/client";
import createApolloClient from "./lib/apolloClient";
import styles from "./styles/Home.module.css";
import { NextPage } from "next";
import { NextWebVitalsMetric } from "next/app";
import { useReportWebVitals } from "next/web-vitals";

interface Country {
    code: string;
    name: string;
    emoji: string;
}

const GET_COUNTRIES = gql`
    query Countries {
        countries {
            code
            name
            emoji
        }
    }
`;

const Home: NextPage = () => {
    // const client = createApolloClient();
    // const { data } = await client.query({
    //     query: GET_COUNTRIES,
    // });

    // const countries: Country[] = data.countries.slice(0, 4);
    useReportWebVitals((metric) => {
        console.log(metric);
    });
    return (
        <div className={styles.container}>
            <h1 role="heading">Countries</h1>
            <ul>
                {/* {countries.map((country) => (
                    <li key={country.code}>
                        {country.name} {country.emoji}
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default Home;
