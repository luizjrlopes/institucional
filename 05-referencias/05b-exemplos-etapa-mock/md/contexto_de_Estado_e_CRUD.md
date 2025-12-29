# Course Context and CRUD Operations

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course, Topic } from "../types/course";
import initialData from "../data/initialData.json";

interface CourseContextType {
  courses: Course[];
  toggleTopic: (
    courseId: string,
    certId: string,
    modId: string,
    subId: string,
    blkId: string,
    topicId: string
  ) => void;
  updateTopicTitle: (
    courseId: string,
    topicId: string,
    newTitle: string
  ) => void;
  addTopic: (courseId: string, blkId: string, title: string) => void;
  removeTopic: (courseId: string, topicId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>(initialData as Course[]);

  useEffect(() => {
    const saved = localStorage.getItem("gps_master_data");
    if (saved) setCourses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("gps_master_data", JSON.stringify(courses));
  }, [courses]);

  const toggleTopic = (
    courseId: string,
    certId: string,
    modId: string,
    subId: string,
    blkId: string,
    topicId: string
  ) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          certifications: course.certifications.map((cert) => {
            if (cert.id !== certId) return cert;
            return {
              ...cert,
              modules: cert.modules.map((mod) => {
                if (mod.id !== modId) return mod;
                return {
                  ...mod,
                  submodules: mod.submodules.map((sub) => {
                    if (sub.id !== subId) return sub;
                    return {
                      ...sub,
                      blocks: sub.blocks.map((blk) => {
                        if (blk.id !== blkId) return blk;
                        return {
                          ...blk,
                          topics: blk.topics.map((t) =>
                            t.id === topicId
                              ? { ...t, completed: !t.completed }
                              : t
                          ),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        };
      })
    );
  };

  const updateTopicTitle = (
    courseId: string,
    topicId: string,
    newTitle: string
  ) => {
    // Implementation to traverse tree and update topic title
  };

  const addTopic = (courseId: string, blkId: string, title: string) => {
    // Implementation to add new Topic to correct block
  };

  const removeTopic = (courseId: string, topicId: string) => {
    // Implementation to remove topic from list
  };

  return (
    <CourseContext.Provider
      value={{ courses, toggleTopic, updateTopicTitle, addTopic, removeTopic }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context)
    throw new Error("useCourses must be used within CourseProvider");
  return context;
};
```
