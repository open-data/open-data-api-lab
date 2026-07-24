import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { motion as m, AnimatePresence } from 'motion/react';
import DocHead from '@/components/docHead';
import Link from 'next/link';
import CodeTabs from '@/components/codeTabs';
import {
  PageMainStyle,
  ContainerMainStyle,
  ContentMainStyle,
  PageLinkStyle,
  PageBreakStyle,
} from '@/utils/classNames';
import { API_BASE_URI } from '@/utils/constants';
import { animationWrapper, splashTextAnimation } from '@/utils/animations';
import { ckan_action_api } from '@/utils/functions';

export default function HomePage(props) {
  const [exampleResponse, setexampleResponse] = useState();

  useEffect(() => {
    async function load_example_response() {
      try {
        const response = await ckan_action_api('status_show');
        setexampleResponse(response);
      } catch (err) {
        console.error(err);
      }
    }

    load_example_response();
  }, []);

  const examples = [
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `
fetch(
  "${API_BASE_URI}/data/api/action/status_show"
)
  .then(response => response.json())
  .then(console.log);
`.trim(),
    },
    {
      label: 'Python',
      language: 'python',
      code: `
from ckanapi import RemoteCKAN
from pprint import pprint

rc = RemoteCKAN("${API_BASE_URI}")
response = rc.action.status_show()

pprint(response)
`.trim(),
    },
    {
      label: 'cURL',
      language: 'bash',
      code: `
curl -s ${API_BASE_URI}/data/api/action/status_show | jq
`.trim(),
    },
  ];

  return (
    <>
      <DocHead
        title="Canadian Open Data API Lab"
        description="Use case examples for the Government of Canada Open Data Portal API"
      />
      <AnimatePresence>
        <m.div
          className={PageMainStyle}
          variants={animationWrapper}
          initial={'hidden'}
          animate={'show'}
        >
          <m.div
            className={ContainerMainStyle}
            variants={splashTextAnimation}
            id={'home-overview'}
          >
            <div className={ContentMainStyle}>
              <h1>Canadian Open Data API Lab</h1>
              <h2>Overview</h2>
              <p>
                The Canadian Open Data API Lab is a collection of practical
                examples and interactive demonstrations for working with
                Canada's Open Data APIs. Whether you're building a website,
                developing a desktop application, or integrating data into your
                own software, this site provides real-world examples to help you
                get started.
              </p>
              <p>
                Explore API requests using JavaScript, Python, cURL, and other
                technologies. Learn how to search datasets, retrieve metadata,
                access DataStore records, and build applications powered by
                Canada's open data. Each example is designed to be simple,
                reusable, and easy to adapt to your own projects.
              </p>
              <p>
                The goal of this project is to bridge the gap between API
                documentation and working code by providing clear explanations,
                sample implementations, and interactive demonstrations that you
                can experiment with and build upon.
              </p>
              <p>
                Whether you're a web developer, MS365 developer, data analyst,
                researcher, student, or simply curious about Canada's open data,
                the Canadian Open Data API Lab is a place to learn and explore
                the Open Data API.
              </p>
              <div className={PageBreakStyle}></div>
              <h2>Technology</h2>
              <p>
                Canada's Open Government Portal API is built with the{' '}
                <Link
                  className={PageLinkStyle}
                  href={'https://docs.ckan.org/en/2.10/api/'}
                  target={'_blank'}
                >
                  CKAN Action API.
                </Link>{' '}
                The JSON based API provides programmatic access to datasets,
                organizations, resources, and metadata, allowing developers to
                search the catalogue, retrieve dataset details, and interact
                with the platform using standard HTTP requests.
              </p>
              <p>
                The API returns data in JSON format and follows an
                action-oriented design, where each endpoint performs a specific
                operation such as package_search, package_show, or
                organization_list. Most read-only operations can be accessed
                using simple HTTP GET requests, while authenticated operations
                such as creating or updating content use POST requests with an
                API token.
              </p>
              <p>
                This website focuses on the most commonly used Action API
                endpoints and demonstrates how to consume them from JavaScript,
                Python, cURL, and other programming languages. Each example
                includes practical code snippets, explanations of request
                parameters, and sample responses to help you quickly integrate
                Canada's Open Data into your own applications.
              </p>
              <p>
                While this site primarily covers the CKAN Action API for
                searching and retrieving catalogue metadata, many examples also
                demonstrate how to work with the CKAN DataStore API, which
                provides direct access to structured tabular data stored within
                individual resources. Together, these APIs form a powerful
                platform for discovering and consuming Canada's open data.
              </p>
            </div>
            <CodeTabs
              examples={examples}
              label={'Status Show'}
              response={exampleResponse}
            />
          </m.div>
        </m.div>
      </AnimatePresence>
    </>
  );
}
