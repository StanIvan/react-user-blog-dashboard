import { BlogPost } from "../../data/data";
import reducer, {
  BlogPostsState,
  createBlogPost,
  fetchBlogPosts,
  removeBlogPost,
  updateBlogPost,
} from "../blog/blogSlice";

const TestBlogPosts: BlogPost[] = [
  {
    "id": "037d4464-5d8d-4a66-830d-9b42be63261d",
    "userId": 76,
    "datePosted": "2022-05-07T01:41:43Z",
    "title":
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.",
    "body":
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue.",
  },
  {
    "id": "d284f352-71a2-40a5-9c7a-b7befa4c601d",
    "userId": 31,
    "datePosted": "2022-01-14T14:39:23Z",
    "title":
      "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
    "body":
      "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
  },
];

describe("blogSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      blogPosts: [],
    });
  });

  it("adds blogs to list when fetched", () => {
    const action = {
      type: fetchBlogPosts.fulfilled.type,
      payload: TestBlogPosts,
    };

    const previousState: BlogPostsState = {
      blogPosts: [],
    };

    expect(reducer(previousState, action)).toEqual({
      blogPosts: TestBlogPosts,
    });
  });

  it("updates a blog post when updateBlogPost is fulfilled", () => {
    const initialState: BlogPostsState = {
      blogPosts: [
        {
          id: "1",
          userId: 1,
          datePosted: "2020-01-01T00:00:00Z",
          title: "Old Title",
          body: "Old Body",
        },
      ],
    };

    const updatedPost: BlogPost = {
      id: "1",
      userId: 1,
      datePosted: "2020-01-01T00:00:00Z",
      title: "New Title",
      body: "New Body",
    };

    const action = {
      type: updateBlogPost.fulfilled.type,
      payload: updatedPost,
    };

    const newState = reducer(initialState, action);
    expect(newState.blogPosts[0]).toEqual(updatedPost);
  });

  it("removes a blog post when removeBlogPost is fulfilled", () => {
    const initialState: BlogPostsState = {
      blogPosts: [
        {
          id: "1",
          userId: 1,
          datePosted: "2020-01-01T00:00:00Z",
          title: "Title 1",
          body: "Body 1",
        },
        {
          id: "2",
          userId: 2,
          datePosted: "2020-02-02T00:00:00Z",
          title: "Title 2",
          body: "Body 2",
        },
      ],
    };

    const action = {
      type: removeBlogPost.fulfilled.type,
      payload: "1",
    };

    const newState = reducer(initialState, action);
    expect(newState.blogPosts).toHaveLength(1);
    expect(newState.blogPosts[0].id).toBe("2");
  });

  it("creates a blog post when createBlogPost is fulfilled", () => {
    const initialState: BlogPostsState = {
      blogPosts: [
        {
          id: "1",
          userId: 1,
          datePosted: "2020-01-01T00:00:00Z",
          title: "Title 1",
          body: "Body 1",
        },
      ],
    };

    const newPost: BlogPost = {
      id: "2",
      userId: 2,
      datePosted: "2020-03-03T00:00:00Z",
      title: "Title 2",
      body: "Body 2",
    };

    const action = {
      type: createBlogPost.fulfilled.type,
      payload: newPost,
    };

    const newState = reducer(initialState, action);
    expect(newState.blogPosts[0]).toEqual(newPost);
    expect(newState.blogPosts).toHaveLength(2);
  });
});
