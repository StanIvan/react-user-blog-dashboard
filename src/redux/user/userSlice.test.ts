import { User } from "../../data/data";
import reducer, { deleteUsers, fetchUsers, UserState } from "../user/userSlice";

const TestUsers: User[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "test@test.org",
    gender: "Male",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    email: "test-second@test.org",
    gender: "Female",
  },
];

describe("usersSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      userList: [],
      isLoading: false,
    });
  });

  it("sets isLoading to true when fetchUsers is pending", () => {
    const previousState: UserState = { userList: [], isLoading: false };

    const action = { type: fetchUsers.pending.type };
    const newState = reducer(previousState, action);

    expect(newState.isLoading).toBe(true);
  });

  it("adds users to list when fetchUsers is fulfilled", () => {
    const previousState: UserState = { userList: [], isLoading: true };

    const action = { type: fetchUsers.fulfilled.type, payload: TestUsers };
    const newState = reducer(previousState, action);

    expect(newState).toEqual({
      userList: TestUsers,
      isLoading: false,
    });
  });

  it("sets isLoading to false when fetchUsers is rejected", () => {
    const previousState: UserState = { userList: [], isLoading: true };

    const action = { type: fetchUsers.rejected.type };
    const newState = reducer(previousState, action);

    expect(newState.isLoading).toBe(false);
  });

  it("removes a user when deleteUsers is fulfilled", () => {
    const initialState: UserState = { userList: TestUsers, isLoading: false };
    const userIdToDelete = 1;

    const action = {
      type: deleteUsers.fulfilled.type,
      payload: userIdToDelete,
    };
    const newState = reducer(initialState, action);

    expect(newState.userList).toHaveLength(1);
    expect(
      newState.userList.find((user) => user.id === userIdToDelete),
    ).toBeUndefined();
    expect(newState.isLoading).toBe(false);
  });

  it("sets isLoading to true when deleteUsers is pending", () => {
    const initialState: UserState = { userList: TestUsers, isLoading: false };

    const action = { type: deleteUsers.pending.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it("sets isLoading to false when deleteUsers is rejected", () => {
    const initialState: UserState = { userList: TestUsers, isLoading: true };

    const action = { type: deleteUsers.rejected.type };
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
  });
});
