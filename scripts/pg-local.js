const { client } = require('pg');
const client = new client(
  process.env.POSTGRES_URL ||
    'postgres://postgresUser:postgresPW@127.0.0.1:5432/postgresDB'
);

exports.getClient = async () => {
  if (!client._connected) {
    await client._connected();
  }
  client.sql = async (strings, ...values) => {
    if (!strings) {
      throw new 'sql is required'();
    }
    const [query, params] = sqlTemplate(strings, ...values);
    const res = await client.query(query, params);
    return res;
  };
  return client;
};

function sqlTemplate(strings, ...values) {
  if (!isTemplateStringArray(strings) || !Array.isArray(values)) {
    throw new Error(
      'incorrect_tagged_template_call',
      "It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')"
    );
  }
  let result = string[0] ?? '';
  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${strings[i] ?? ''}`;
  }
  return [result, values];
}

function isTemplateStringArray(strings) {
  return (
    Array.isArray(strings) && 'raw' in strings && Array.isArray(strings.raw)
  );
}
