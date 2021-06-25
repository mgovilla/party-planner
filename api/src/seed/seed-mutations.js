var fs = require('fs').promises
const parse = require('csv-parse/lib/sync')
const { gql } = require('@apollo/client')

export const getSeedMutations = async () => {
  const parties = await fs.readFile('src/seed/csv/parties.csv')
  const users = await fs.readFile('src/seed/csv/users.csv')
  const objects = await fs.readFile('src/seed/csv/objects.csv')
  const records = {
    parties: parse(parties, { columns: true }),
    users: parse(users, { columns: true }),
    objects: parse(objects, { columns: true }),
  }
  const mutations = generateMutations(records)
  return mutations
}

const generateMutations = (records) => {
  // for each parties record, createParty(information)
  // for each user record, createUser(info, parties: {connect: {where: {id_IN: partyids}}})
  // for each object record, createObject(info, party: {connect: {where: {id_IN: partyid}}}, owner: {connect: {where: {id_IN: userid}}})

  // todo: refactor into a single createParties mutation
  let partyMutations = records.parties.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'invitees' || k === 'host' || k === 'requires') delete rec[k]
    })

    return {
      mutation: gql`
        mutation createParty(
          $name: String!
          $location: String
          $date: DateTime
        ) {
          party: createParties(
            input: { name: $name, location: $location, date: $date }
          ) {
            parties {
              id
              name
              location
              date
            }
          }
        }
      `,
      variables: rec,
    }
  })

  let userMutations = records.users.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'id') rec[k] = parseInt(rec[k])
      // This will convert an empty entry to 0, make sure no id is = 0
      else if (k === 'parties' || k === 'hosting') rec[k] = rec[k].split(',')
      else if (k === 'bringing') delete rec[k]
    })

    return {
      mutation: gql`
        mutation createUser(
          $id: ID!
          $name: String!
          $email: String
          $hosting: [String]
          $parties: [String]
        ) {
          user: createUsers(
            input: {
              id: $id
              name: $name
              email: $email
              parties: { connect: { where: { name_IN: $parties } } }
              hosting: { connect: { where: { name_IN: $hosting } } }
            }
          ) {
            users {
              id
              name
              hosting {
                id
                name
                location
                date
                invitees {
                  id
                  name
                }
              }

              parties {
                id
                name
                location
                date
                host {
                  id
                  name
                }
              }
            }
          }
        }
      `,
      variables: rec,
    }
  })

  let objectMutations = records.objects.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'owner' || k === 'cost') rec[k] = Number(rec[k])
    })

    return {
      mutation: gql`
        mutation createObject(
          $name: String
          $owner: ID
          $party: String
          $cost: Float
        ) {
          object: createObjects(
            input: {
              name: $name
              cost: $cost
              owner: { connect: { where: { id: $owner } } }
              party: { connect: { where: { name: $party } } }
            }
          ) {
            objects {
              id
              name
            }
          }
        }
      `,
      variables: rec,
    }
  })

  return [partyMutations, userMutations, objectMutations]
}
