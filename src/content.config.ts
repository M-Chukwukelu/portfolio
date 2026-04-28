import { glob, file } from 'astro/loaders';
import { defineCollection } from 'astro/content/config';
import { z } from 'astro/zod'

const projects = defineCollection({
    loader: glob({pattern: "src/content/projects/**/*.md"}),
    schema: z.object({
        id: z.number(),
        title: z.string().max(50),
        tools: z.preprocess(
            (val) => (Array.isArray(val) ? val : [val]),
            z.array(z.enum(["Python","Java","Go","SQL","TypeScript","JavaScript","React","Node.js","Express", "MongoDB","Supabase","Docker","Airflow","dbt","Snowflake","FastAPI","Spring Boot","PostgreSQL","Kafka","AWS","scikit-learn","Streamlit","WebSockets","Leader Election","Replication","LIVE"]))), // change categories here
        year: z.string().max(4),
        liveSite: z.url().optional(),
        github: z.url().optional(),
        description: z.string().max(350),
        isFeatured: z.boolean(),
        isDraft: z.boolean()
    })
});

const experience = defineCollection({
    loader: file("src/content/resume/experience.yaml"),
    schema: z.object({
        title: z.string().max(70),
        timeline: z.string().max(30),
        description: z.string().max(500)
    })
})

const education = defineCollection({
    loader: file("src/content/resume/education.yaml"),
    schema: z.object({
        title: z.string().max(70),
        timeline: z.string().max(15),
        school: z.string().max(70)
    })
})

const skillsAndTools = defineCollection({
    loader: file("src/content/skills-and-tools/skillsAndTools.yaml"),
    schema: z.object({
        title: z.string().max(70),
        items: z.array(z.string())
    })
})

const awards = defineCollection({
 loader: file("src/content/awards/awards.yaml"),
  schema: z.object({
    id: z.number(),
    year: z.string(),
    honour: z.string(),
    competition: z.string(),
    link: z.url().optional(),
    title: z.string(),
    awarder: z.string(),
    isWinner: z.boolean().optional(),
  }),
});

const writing = defineCollection({
  loader: file("src/content/writing/writing.yaml"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    publisher: z.string(),
    link: z.url(),
    type: z.enum(["Fiction", "Non-Fiction", "Academic"]),
    isAwarded: z.boolean(),
    monthYearAwarded: z.string().optional(),
    honour: z.string().optional(),
    competition: z.string().optional()
  }),
});

export const collections = { projects, experience, education, skillsAndTools, awards, writing};