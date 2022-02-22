import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import * as PrismicHelper from '@prismicio/helpers';

import Client from "../../utils/prismicHelpers";

import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismic = Client(req);

  const response = await prismic.getByUID<any>('post', String(slug), {});

  const post = {
    slug,
    title: PrismicHelper.asText(response.data.title),
    content: PrismicHelper.asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }

  return {
    props: {
      post
    }
  }
}