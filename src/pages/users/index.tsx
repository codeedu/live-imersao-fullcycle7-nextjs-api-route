import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { http } from "../../util/http";
import useSWR from 'swr';
type User = {
  name: string;
};

type UserPageProps = {
  users: User[];
};

const fetcher = (url: string) => http.get(url).then((res) => res.data);


const UsersPage: NextPage<UserPageProps> = (props) => {
  const { users: usersProp } = props;
  // const [users, setUsers] = useState(usersProp);


  const {data: users, error} = useSWR('api/users', fetcher, {
    fallbackData: usersProp,
    refreshInterval: 1000,
    shouldRetryOnError: true
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     http.get("api/users").then((response) => setUsers(response.data));
  //   }, 1000);
  // }, []);

  return (
    <div>
      <h1>UsersPage</h1>
      <ul>
        {users.map((user: any, key) => (
          <li key={key}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await http.get("api/users");

  return {
    props: {
      users: data,
    },
  };
};

//organizar as urls
//autenticação
