import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import CaseSidebar from "../components/CaseSidebar";
import Content, { HTMLContent } from "../components/Content";

export const CaseTemplate = ({
  content,
  contentComponent,
  description,
  title,
  subtitle,
  linkedinbild,
  blurbs,
	card,
	descriptionSidebar
}) => {
  const PostContent = contentComponent || Content;

  return (
    <main id="case">
      <section id="hero">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>{title}</h1>
              <h3>{subtitle}</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="body">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-8">
              <PostContent content={content} />
            </div>
            <div className="col-md-4">
              <div className="col-12">
                <Img fixed={card.childImageSharp.fixed} alt={title} />
								<h4>{title}</h4>
								<p>{descriptionSidebar}</p>
              </div>
              <CaseSidebar content={blurbs} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Case = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <CaseTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        linkedinbild={post.frontmatter.linkedinbild}
        blurbs={post.frontmatter.intro.blurbs}
				card={post.frontmatter.intro.card}
				descriptionSidebar={post.frontmatter.intro.description}
      />
    </Layout>
  );
};

export default Case;

export const casePageQuery = graphql`
  query CaseByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        metaDescription
        subtitle
        linkedinbild {
          publicURL
        }
        intro {
          card {
          childImageSharp {
            fixed(width: 350, height: 220, quality: 80) {
              ...GatsbyImageSharpFixed
            }
          }
          publicURL
        }
					description
          blurbs {
            blurb {
              image {
                childImageSharp {
                  fluid(maxWidth: 350, quality: 80) {
                    ...GatsbyImageSharpFluid
                  }
                }
                publicURL
                id
              }
            rubrik
            text
          }
        }
      }
      tags
    }
  }
  }
`;
