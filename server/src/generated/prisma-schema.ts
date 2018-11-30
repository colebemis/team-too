export const typeDefs = /* GraphQL */ `type Address {
  id: ID!
  name: String!
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
}

type AddressConnection {
  pageInfo: PageInfo!
  edges: [AddressEdge]!
  aggregate: AggregateAddress!
}

input AddressCreateInput {
  name: String!
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
}

input AddressCreateOneInput {
  create: AddressCreateInput
  connect: AddressWhereUniqueInput
}

type AddressEdge {
  node: Address!
  cursor: String!
}

enum AddressOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  line1_ASC
  line1_DESC
  line2_ASC
  line2_DESC
  city_ASC
  city_DESC
  state_ASC
  state_DESC
  zip_ASC
  zip_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AddressPreviousValues {
  id: ID!
  name: String!
  line1: String!
  line2: String
  city: String!
  state: String!
  zip: String!
}

type AddressSubscriptionPayload {
  mutation: MutationType!
  node: Address
  updatedFields: [String!]
  previousValues: AddressPreviousValues
}

input AddressSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AddressWhereInput
  AND: [AddressSubscriptionWhereInput!]
  OR: [AddressSubscriptionWhereInput!]
  NOT: [AddressSubscriptionWhereInput!]
}

input AddressUpdateDataInput {
  name: String
  line1: String
  line2: String
  city: String
  state: String
  zip: String
}

input AddressUpdateInput {
  name: String
  line1: String
  line2: String
  city: String
  state: String
  zip: String
}

input AddressUpdateManyMutationInput {
  name: String
  line1: String
  line2: String
  city: String
  state: String
  zip: String
}

input AddressUpdateOneInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: AddressWhereUniqueInput
}

input AddressUpdateOneRequiredInput {
  create: AddressCreateInput
  update: AddressUpdateDataInput
  upsert: AddressUpsertNestedInput
  connect: AddressWhereUniqueInput
}

input AddressUpsertNestedInput {
  update: AddressUpdateDataInput!
  create: AddressCreateInput!
}

input AddressWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  line1: String
  line1_not: String
  line1_in: [String!]
  line1_not_in: [String!]
  line1_lt: String
  line1_lte: String
  line1_gt: String
  line1_gte: String
  line1_contains: String
  line1_not_contains: String
  line1_starts_with: String
  line1_not_starts_with: String
  line1_ends_with: String
  line1_not_ends_with: String
  line2: String
  line2_not: String
  line2_in: [String!]
  line2_not_in: [String!]
  line2_lt: String
  line2_lte: String
  line2_gt: String
  line2_gte: String
  line2_contains: String
  line2_not_contains: String
  line2_starts_with: String
  line2_not_starts_with: String
  line2_ends_with: String
  line2_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  state: String
  state_not: String
  state_in: [String!]
  state_not_in: [String!]
  state_lt: String
  state_lte: String
  state_gt: String
  state_gte: String
  state_contains: String
  state_not_contains: String
  state_starts_with: String
  state_not_starts_with: String
  state_ends_with: String
  state_not_ends_with: String
  zip: String
  zip_not: String
  zip_in: [String!]
  zip_not_in: [String!]
  zip_lt: String
  zip_lte: String
  zip_gt: String
  zip_gte: String
  zip_contains: String
  zip_not_contains: String
  zip_starts_with: String
  zip_not_starts_with: String
  zip_ends_with: String
  zip_not_ends_with: String
  AND: [AddressWhereInput!]
  OR: [AddressWhereInput!]
  NOT: [AddressWhereInput!]
}

input AddressWhereUniqueInput {
  id: ID
}

type AggregateAddress {
  count: Int!
}

type AggregateCategory {
  count: Int!
}

type AggregateCreditCard {
  count: Int!
}

type AggregateCustomer {
  count: Int!
}

type AggregateHours {
  count: Int!
}

type AggregateOrder {
  count: Int!
}

type AggregateOrderProduct {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateSiteInfo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Category {
  id: ID!
  name: String!
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
}

type CategoryConnection {
  pageInfo: PageInfo!
  edges: [CategoryEdge]!
  aggregate: AggregateCategory!
}

input CategoryCreateInput {
  name: String!
  products: ProductCreateManyWithoutCategoriesInput
}

input CategoryCreateManyWithoutProductsInput {
  create: [CategoryCreateWithoutProductsInput!]
  connect: [CategoryWhereUniqueInput!]
}

input CategoryCreateWithoutProductsInput {
  name: String!
}

type CategoryEdge {
  node: Category!
  cursor: String!
}

enum CategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CategoryPreviousValues {
  id: ID!
  name: String!
}

type CategorySubscriptionPayload {
  mutation: MutationType!
  node: Category
  updatedFields: [String!]
  previousValues: CategoryPreviousValues
}

input CategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CategoryWhereInput
  AND: [CategorySubscriptionWhereInput!]
  OR: [CategorySubscriptionWhereInput!]
  NOT: [CategorySubscriptionWhereInput!]
}

input CategoryUpdateInput {
  name: String
  products: ProductUpdateManyWithoutCategoriesInput
}

input CategoryUpdateManyMutationInput {
  name: String
}

input CategoryUpdateManyWithoutProductsInput {
  create: [CategoryCreateWithoutProductsInput!]
  delete: [CategoryWhereUniqueInput!]
  connect: [CategoryWhereUniqueInput!]
  disconnect: [CategoryWhereUniqueInput!]
  update: [CategoryUpdateWithWhereUniqueWithoutProductsInput!]
  upsert: [CategoryUpsertWithWhereUniqueWithoutProductsInput!]
}

input CategoryUpdateWithoutProductsDataInput {
  name: String
}

input CategoryUpdateWithWhereUniqueWithoutProductsInput {
  where: CategoryWhereUniqueInput!
  data: CategoryUpdateWithoutProductsDataInput!
}

input CategoryUpsertWithWhereUniqueWithoutProductsInput {
  where: CategoryWhereUniqueInput!
  update: CategoryUpdateWithoutProductsDataInput!
  create: CategoryCreateWithoutProductsInput!
}

input CategoryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
  AND: [CategoryWhereInput!]
  OR: [CategoryWhereInput!]
  NOT: [CategoryWhereInput!]
}

input CategoryWhereUniqueInput {
  id: ID
}

type CreditCard {
  id: ID!
  name: String!
  number: String!
  expDate: DateTime!
  cvv: String!
}

type CreditCardConnection {
  pageInfo: PageInfo!
  edges: [CreditCardEdge]!
  aggregate: AggregateCreditCard!
}

input CreditCardCreateInput {
  name: String!
  number: String!
  expDate: DateTime!
  cvv: String!
}

input CreditCardCreateOneInput {
  create: CreditCardCreateInput
  connect: CreditCardWhereUniqueInput
}

type CreditCardEdge {
  node: CreditCard!
  cursor: String!
}

enum CreditCardOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  number_ASC
  number_DESC
  expDate_ASC
  expDate_DESC
  cvv_ASC
  cvv_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CreditCardPreviousValues {
  id: ID!
  name: String!
  number: String!
  expDate: DateTime!
  cvv: String!
}

type CreditCardSubscriptionPayload {
  mutation: MutationType!
  node: CreditCard
  updatedFields: [String!]
  previousValues: CreditCardPreviousValues
}

input CreditCardSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CreditCardWhereInput
  AND: [CreditCardSubscriptionWhereInput!]
  OR: [CreditCardSubscriptionWhereInput!]
  NOT: [CreditCardSubscriptionWhereInput!]
}

input CreditCardUpdateDataInput {
  name: String
  number: String
  expDate: DateTime
  cvv: String
}

input CreditCardUpdateInput {
  name: String
  number: String
  expDate: DateTime
  cvv: String
}

input CreditCardUpdateManyMutationInput {
  name: String
  number: String
  expDate: DateTime
  cvv: String
}

input CreditCardUpdateOneInput {
  create: CreditCardCreateInput
  update: CreditCardUpdateDataInput
  upsert: CreditCardUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CreditCardWhereUniqueInput
}

input CreditCardUpsertNestedInput {
  update: CreditCardUpdateDataInput!
  create: CreditCardCreateInput!
}

input CreditCardWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  number: String
  number_not: String
  number_in: [String!]
  number_not_in: [String!]
  number_lt: String
  number_lte: String
  number_gt: String
  number_gte: String
  number_contains: String
  number_not_contains: String
  number_starts_with: String
  number_not_starts_with: String
  number_ends_with: String
  number_not_ends_with: String
  expDate: DateTime
  expDate_not: DateTime
  expDate_in: [DateTime!]
  expDate_not_in: [DateTime!]
  expDate_lt: DateTime
  expDate_lte: DateTime
  expDate_gt: DateTime
  expDate_gte: DateTime
  cvv: String
  cvv_not: String
  cvv_in: [String!]
  cvv_not_in: [String!]
  cvv_lt: String
  cvv_lte: String
  cvv_gt: String
  cvv_gte: String
  cvv_contains: String
  cvv_not_contains: String
  cvv_starts_with: String
  cvv_not_starts_with: String
  cvv_ends_with: String
  cvv_not_ends_with: String
  AND: [CreditCardWhereInput!]
  OR: [CreditCardWhereInput!]
  NOT: [CreditCardWhereInput!]
}

input CreditCardWhereUniqueInput {
  id: ID
}

type Customer {
  id: ID!
  name: String!
  email: String!
}

type CustomerConnection {
  pageInfo: PageInfo!
  edges: [CustomerEdge]!
  aggregate: AggregateCustomer!
}

input CustomerCreateInput {
  name: String!
  email: String!
}

input CustomerCreateOneInput {
  create: CustomerCreateInput
  connect: CustomerWhereUniqueInput
}

type CustomerEdge {
  node: Customer!
  cursor: String!
}

enum CustomerOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CustomerPreviousValues {
  id: ID!
  name: String!
  email: String!
}

type CustomerSubscriptionPayload {
  mutation: MutationType!
  node: Customer
  updatedFields: [String!]
  previousValues: CustomerPreviousValues
}

input CustomerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CustomerWhereInput
  AND: [CustomerSubscriptionWhereInput!]
  OR: [CustomerSubscriptionWhereInput!]
  NOT: [CustomerSubscriptionWhereInput!]
}

input CustomerUpdateDataInput {
  name: String
  email: String
}

input CustomerUpdateInput {
  name: String
  email: String
}

input CustomerUpdateManyMutationInput {
  name: String
  email: String
}

input CustomerUpdateOneRequiredInput {
  create: CustomerCreateInput
  update: CustomerUpdateDataInput
  upsert: CustomerUpsertNestedInput
  connect: CustomerWhereUniqueInput
}

input CustomerUpsertNestedInput {
  update: CustomerUpdateDataInput!
  create: CustomerCreateInput!
}

input CustomerWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  AND: [CustomerWhereInput!]
  OR: [CustomerWhereInput!]
  NOT: [CustomerWhereInput!]
}

input CustomerWhereUniqueInput {
  id: ID
}

scalar DateTime

type Hours {
  id: ID!
  index: Int!
  day: String!
  open: String!
  close: String!
}

type HoursConnection {
  pageInfo: PageInfo!
  edges: [HoursEdge]!
  aggregate: AggregateHours!
}

input HoursCreateInput {
  index: Int!
  day: String!
  open: String!
  close: String!
}

input HoursCreateManyInput {
  create: [HoursCreateInput!]
  connect: [HoursWhereUniqueInput!]
}

type HoursEdge {
  node: Hours!
  cursor: String!
}

enum HoursOrderByInput {
  id_ASC
  id_DESC
  index_ASC
  index_DESC
  day_ASC
  day_DESC
  open_ASC
  open_DESC
  close_ASC
  close_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HoursPreviousValues {
  id: ID!
  index: Int!
  day: String!
  open: String!
  close: String!
}

type HoursSubscriptionPayload {
  mutation: MutationType!
  node: Hours
  updatedFields: [String!]
  previousValues: HoursPreviousValues
}

input HoursSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HoursWhereInput
  AND: [HoursSubscriptionWhereInput!]
  OR: [HoursSubscriptionWhereInput!]
  NOT: [HoursSubscriptionWhereInput!]
}

input HoursUpdateDataInput {
  index: Int
  day: String
  open: String
  close: String
}

input HoursUpdateInput {
  index: Int
  day: String
  open: String
  close: String
}

input HoursUpdateManyInput {
  create: [HoursCreateInput!]
  update: [HoursUpdateWithWhereUniqueNestedInput!]
  upsert: [HoursUpsertWithWhereUniqueNestedInput!]
  delete: [HoursWhereUniqueInput!]
  connect: [HoursWhereUniqueInput!]
  disconnect: [HoursWhereUniqueInput!]
}

input HoursUpdateManyMutationInput {
  index: Int
  day: String
  open: String
  close: String
}

input HoursUpdateWithWhereUniqueNestedInput {
  where: HoursWhereUniqueInput!
  data: HoursUpdateDataInput!
}

input HoursUpsertWithWhereUniqueNestedInput {
  where: HoursWhereUniqueInput!
  update: HoursUpdateDataInput!
  create: HoursCreateInput!
}

input HoursWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  index: Int
  index_not: Int
  index_in: [Int!]
  index_not_in: [Int!]
  index_lt: Int
  index_lte: Int
  index_gt: Int
  index_gte: Int
  day: String
  day_not: String
  day_in: [String!]
  day_not_in: [String!]
  day_lt: String
  day_lte: String
  day_gt: String
  day_gte: String
  day_contains: String
  day_not_contains: String
  day_starts_with: String
  day_not_starts_with: String
  day_ends_with: String
  day_not_ends_with: String
  open: String
  open_not: String
  open_in: [String!]
  open_not_in: [String!]
  open_lt: String
  open_lte: String
  open_gt: String
  open_gte: String
  open_contains: String
  open_not_contains: String
  open_starts_with: String
  open_not_starts_with: String
  open_ends_with: String
  open_not_ends_with: String
  close: String
  close_not: String
  close_in: [String!]
  close_not_in: [String!]
  close_lt: String
  close_lte: String
  close_gt: String
  close_gte: String
  close_contains: String
  close_not_contains: String
  close_starts_with: String
  close_not_starts_with: String
  close_ends_with: String
  close_not_ends_with: String
  AND: [HoursWhereInput!]
  OR: [HoursWhereInput!]
  NOT: [HoursWhereInput!]
}

input HoursWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAddress(data: AddressCreateInput!): Address!
  updateAddress(data: AddressUpdateInput!, where: AddressWhereUniqueInput!): Address
  updateManyAddresses(data: AddressUpdateManyMutationInput!, where: AddressWhereInput): BatchPayload!
  upsertAddress(where: AddressWhereUniqueInput!, create: AddressCreateInput!, update: AddressUpdateInput!): Address!
  deleteAddress(where: AddressWhereUniqueInput!): Address
  deleteManyAddresses(where: AddressWhereInput): BatchPayload!
  createCategory(data: CategoryCreateInput!): Category!
  updateCategory(data: CategoryUpdateInput!, where: CategoryWhereUniqueInput!): Category
  updateManyCategories(data: CategoryUpdateManyMutationInput!, where: CategoryWhereInput): BatchPayload!
  upsertCategory(where: CategoryWhereUniqueInput!, create: CategoryCreateInput!, update: CategoryUpdateInput!): Category!
  deleteCategory(where: CategoryWhereUniqueInput!): Category
  deleteManyCategories(where: CategoryWhereInput): BatchPayload!
  createCreditCard(data: CreditCardCreateInput!): CreditCard!
  updateCreditCard(data: CreditCardUpdateInput!, where: CreditCardWhereUniqueInput!): CreditCard
  updateManyCreditCards(data: CreditCardUpdateManyMutationInput!, where: CreditCardWhereInput): BatchPayload!
  upsertCreditCard(where: CreditCardWhereUniqueInput!, create: CreditCardCreateInput!, update: CreditCardUpdateInput!): CreditCard!
  deleteCreditCard(where: CreditCardWhereUniqueInput!): CreditCard
  deleteManyCreditCards(where: CreditCardWhereInput): BatchPayload!
  createCustomer(data: CustomerCreateInput!): Customer!
  updateCustomer(data: CustomerUpdateInput!, where: CustomerWhereUniqueInput!): Customer
  updateManyCustomers(data: CustomerUpdateManyMutationInput!, where: CustomerWhereInput): BatchPayload!
  upsertCustomer(where: CustomerWhereUniqueInput!, create: CustomerCreateInput!, update: CustomerUpdateInput!): Customer!
  deleteCustomer(where: CustomerWhereUniqueInput!): Customer
  deleteManyCustomers(where: CustomerWhereInput): BatchPayload!
  createHours(data: HoursCreateInput!): Hours!
  updateHours(data: HoursUpdateInput!, where: HoursWhereUniqueInput!): Hours
  updateManyHourses(data: HoursUpdateManyMutationInput!, where: HoursWhereInput): BatchPayload!
  upsertHours(where: HoursWhereUniqueInput!, create: HoursCreateInput!, update: HoursUpdateInput!): Hours!
  deleteHours(where: HoursWhereUniqueInput!): Hours
  deleteManyHourses(where: HoursWhereInput): BatchPayload!
  createOrder(data: OrderCreateInput!): Order!
  updateOrder(data: OrderUpdateInput!, where: OrderWhereUniqueInput!): Order
  updateManyOrders(data: OrderUpdateManyMutationInput!, where: OrderWhereInput): BatchPayload!
  upsertOrder(where: OrderWhereUniqueInput!, create: OrderCreateInput!, update: OrderUpdateInput!): Order!
  deleteOrder(where: OrderWhereUniqueInput!): Order
  deleteManyOrders(where: OrderWhereInput): BatchPayload!
  createOrderProduct(data: OrderProductCreateInput!): OrderProduct!
  updateOrderProduct(data: OrderProductUpdateInput!, where: OrderProductWhereUniqueInput!): OrderProduct
  updateManyOrderProducts(data: OrderProductUpdateManyMutationInput!, where: OrderProductWhereInput): BatchPayload!
  upsertOrderProduct(where: OrderProductWhereUniqueInput!, create: OrderProductCreateInput!, update: OrderProductUpdateInput!): OrderProduct!
  deleteOrderProduct(where: OrderProductWhereUniqueInput!): OrderProduct
  deleteManyOrderProducts(where: OrderProductWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createSiteInfo(data: SiteInfoCreateInput!): SiteInfo!
  updateSiteInfo(data: SiteInfoUpdateInput!, where: SiteInfoWhereUniqueInput!): SiteInfo
  updateManySiteInfoes(data: SiteInfoUpdateManyMutationInput!, where: SiteInfoWhereInput): BatchPayload!
  upsertSiteInfo(where: SiteInfoWhereUniqueInput!, create: SiteInfoCreateInput!, update: SiteInfoUpdateInput!): SiteInfo!
  deleteSiteInfo(where: SiteInfoWhereUniqueInput!): SiteInfo
  deleteManySiteInfoes(where: SiteInfoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Order {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: String!
  products(where: OrderProductWhereInput, orderBy: OrderProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderProduct!]
  customer: Customer!
  shippingAddress: Address
  billingAddress: Address
  payment: CreditCard
  subtotal: Float!
  tax: Float!
  total: Float!
}

type OrderConnection {
  pageInfo: PageInfo!
  edges: [OrderEdge]!
  aggregate: AggregateOrder!
}

input OrderCreateInput {
  status: String!
  products: OrderProductCreateManyInput
  customer: CustomerCreateOneInput!
  shippingAddress: AddressCreateOneInput
  billingAddress: AddressCreateOneInput
  payment: CreditCardCreateOneInput
  subtotal: Float!
  tax: Float!
  total: Float!
}

type OrderEdge {
  node: Order!
  cursor: String!
}

enum OrderOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  status_ASC
  status_DESC
  subtotal_ASC
  subtotal_DESC
  tax_ASC
  tax_DESC
  total_ASC
  total_DESC
}

type OrderPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  status: String!
  subtotal: Float!
  tax: Float!
  total: Float!
}

type OrderProduct {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  imageURL: String!
  description: String!
  price: Float!
  quantity: Int!
}

type OrderProductConnection {
  pageInfo: PageInfo!
  edges: [OrderProductEdge]!
  aggregate: AggregateOrderProduct!
}

input OrderProductCreateInput {
  title: String!
  imageURL: String!
  description: String!
  price: Float!
  quantity: Int!
}

input OrderProductCreateManyInput {
  create: [OrderProductCreateInput!]
  connect: [OrderProductWhereUniqueInput!]
}

type OrderProductEdge {
  node: OrderProduct!
  cursor: String!
}

enum OrderProductOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  imageURL_ASC
  imageURL_DESC
  description_ASC
  description_DESC
  price_ASC
  price_DESC
  quantity_ASC
  quantity_DESC
}

type OrderProductPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  imageURL: String!
  description: String!
  price: Float!
  quantity: Int!
}

type OrderProductSubscriptionPayload {
  mutation: MutationType!
  node: OrderProduct
  updatedFields: [String!]
  previousValues: OrderProductPreviousValues
}

input OrderProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderProductWhereInput
  AND: [OrderProductSubscriptionWhereInput!]
  OR: [OrderProductSubscriptionWhereInput!]
  NOT: [OrderProductSubscriptionWhereInput!]
}

input OrderProductUpdateDataInput {
  title: String
  imageURL: String
  description: String
  price: Float
  quantity: Int
}

input OrderProductUpdateInput {
  title: String
  imageURL: String
  description: String
  price: Float
  quantity: Int
}

input OrderProductUpdateManyInput {
  create: [OrderProductCreateInput!]
  update: [OrderProductUpdateWithWhereUniqueNestedInput!]
  upsert: [OrderProductUpsertWithWhereUniqueNestedInput!]
  delete: [OrderProductWhereUniqueInput!]
  connect: [OrderProductWhereUniqueInput!]
  disconnect: [OrderProductWhereUniqueInput!]
}

input OrderProductUpdateManyMutationInput {
  title: String
  imageURL: String
  description: String
  price: Float
  quantity: Int
}

input OrderProductUpdateWithWhereUniqueNestedInput {
  where: OrderProductWhereUniqueInput!
  data: OrderProductUpdateDataInput!
}

input OrderProductUpsertWithWhereUniqueNestedInput {
  where: OrderProductWhereUniqueInput!
  update: OrderProductUpdateDataInput!
  create: OrderProductCreateInput!
}

input OrderProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  imageURL: String
  imageURL_not: String
  imageURL_in: [String!]
  imageURL_not_in: [String!]
  imageURL_lt: String
  imageURL_lte: String
  imageURL_gt: String
  imageURL_gte: String
  imageURL_contains: String
  imageURL_not_contains: String
  imageURL_starts_with: String
  imageURL_not_starts_with: String
  imageURL_ends_with: String
  imageURL_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  AND: [OrderProductWhereInput!]
  OR: [OrderProductWhereInput!]
  NOT: [OrderProductWhereInput!]
}

input OrderProductWhereUniqueInput {
  id: ID
}

type OrderSubscriptionPayload {
  mutation: MutationType!
  node: Order
  updatedFields: [String!]
  previousValues: OrderPreviousValues
}

input OrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrderWhereInput
  AND: [OrderSubscriptionWhereInput!]
  OR: [OrderSubscriptionWhereInput!]
  NOT: [OrderSubscriptionWhereInput!]
}

input OrderUpdateInput {
  status: String
  products: OrderProductUpdateManyInput
  customer: CustomerUpdateOneRequiredInput
  shippingAddress: AddressUpdateOneInput
  billingAddress: AddressUpdateOneInput
  payment: CreditCardUpdateOneInput
  subtotal: Float
  tax: Float
  total: Float
}

input OrderUpdateManyMutationInput {
  status: String
  subtotal: Float
  tax: Float
  total: Float
}

input OrderWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  status: String
  status_not: String
  status_in: [String!]
  status_not_in: [String!]
  status_lt: String
  status_lte: String
  status_gt: String
  status_gte: String
  status_contains: String
  status_not_contains: String
  status_starts_with: String
  status_not_starts_with: String
  status_ends_with: String
  status_not_ends_with: String
  products_every: OrderProductWhereInput
  products_some: OrderProductWhereInput
  products_none: OrderProductWhereInput
  customer: CustomerWhereInput
  shippingAddress: AddressWhereInput
  billingAddress: AddressWhereInput
  payment: CreditCardWhereInput
  subtotal: Float
  subtotal_not: Float
  subtotal_in: [Float!]
  subtotal_not_in: [Float!]
  subtotal_lt: Float
  subtotal_lte: Float
  subtotal_gt: Float
  subtotal_gte: Float
  tax: Float
  tax_not: Float
  tax_in: [Float!]
  tax_not_in: [Float!]
  tax_lt: Float
  tax_lte: Float
  tax_gt: Float
  tax_gte: Float
  total: Float
  total_not: Float
  total_in: [Float!]
  total_not_in: [Float!]
  total_lt: Float
  total_lte: Float
  total_gt: Float
  total_gte: Float
  AND: [OrderWhereInput!]
  OR: [OrderWhereInput!]
  NOT: [OrderWhereInput!]
}

input OrderWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Product {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  imageURL: String!
  title: String!
  description: String!
  price: Float!
  stock: Int!
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category!]
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  imageURL: String!
  title: String!
  description: String!
  price: Float!
  stock: Int!
  categories: CategoryCreateManyWithoutProductsInput
}

input ProductCreateManyWithoutCategoriesInput {
  create: [ProductCreateWithoutCategoriesInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateWithoutCategoriesInput {
  imageURL: String!
  title: String!
  description: String!
  price: Float!
  stock: Int!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  imageURL_ASC
  imageURL_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  price_ASC
  price_DESC
  stock_ASC
  stock_DESC
}

type ProductPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  imageURL: String!
  title: String!
  description: String!
  price: Float!
  stock: Int!
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
  AND: [ProductSubscriptionWhereInput!]
  OR: [ProductSubscriptionWhereInput!]
  NOT: [ProductSubscriptionWhereInput!]
}

input ProductUpdateInput {
  imageURL: String
  title: String
  description: String
  price: Float
  stock: Int
  categories: CategoryUpdateManyWithoutProductsInput
}

input ProductUpdateManyMutationInput {
  imageURL: String
  title: String
  description: String
  price: Float
  stock: Int
}

input ProductUpdateManyWithoutCategoriesInput {
  create: [ProductCreateWithoutCategoriesInput!]
  delete: [ProductWhereUniqueInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutCategoriesInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutCategoriesInput!]
}

input ProductUpdateWithoutCategoriesDataInput {
  imageURL: String
  title: String
  description: String
  price: Float
  stock: Int
}

input ProductUpdateWithWhereUniqueWithoutCategoriesInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutCategoriesDataInput!
}

input ProductUpsertWithWhereUniqueWithoutCategoriesInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutCategoriesDataInput!
  create: ProductCreateWithoutCategoriesInput!
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  imageURL: String
  imageURL_not: String
  imageURL_in: [String!]
  imageURL_not_in: [String!]
  imageURL_lt: String
  imageURL_lte: String
  imageURL_gt: String
  imageURL_gte: String
  imageURL_contains: String
  imageURL_not_contains: String
  imageURL_starts_with: String
  imageURL_not_starts_with: String
  imageURL_ends_with: String
  imageURL_not_ends_with: String
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  stock: Int
  stock_not: Int
  stock_in: [Int!]
  stock_not_in: [Int!]
  stock_lt: Int
  stock_lte: Int
  stock_gt: Int
  stock_gte: Int
  categories_every: CategoryWhereInput
  categories_some: CategoryWhereInput
  categories_none: CategoryWhereInput
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
}

type Query {
  address(where: AddressWhereUniqueInput!): Address
  addresses(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Address]!
  addressesConnection(where: AddressWhereInput, orderBy: AddressOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AddressConnection!
  category(where: CategoryWhereUniqueInput!): Category
  categories(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Category]!
  categoriesConnection(where: CategoryWhereInput, orderBy: CategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryConnection!
  creditCard(where: CreditCardWhereUniqueInput!): CreditCard
  creditCards(where: CreditCardWhereInput, orderBy: CreditCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CreditCard]!
  creditCardsConnection(where: CreditCardWhereInput, orderBy: CreditCardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CreditCardConnection!
  customer(where: CustomerWhereUniqueInput!): Customer
  customers(where: CustomerWhereInput, orderBy: CustomerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Customer]!
  customersConnection(where: CustomerWhereInput, orderBy: CustomerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CustomerConnection!
  hours(where: HoursWhereUniqueInput!): Hours
  hourses(where: HoursWhereInput, orderBy: HoursOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Hours]!
  hoursesConnection(where: HoursWhereInput, orderBy: HoursOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HoursConnection!
  order(where: OrderWhereUniqueInput!): Order
  orders(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Order]!
  ordersConnection(where: OrderWhereInput, orderBy: OrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderConnection!
  orderProduct(where: OrderProductWhereUniqueInput!): OrderProduct
  orderProducts(where: OrderProductWhereInput, orderBy: OrderProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OrderProduct]!
  orderProductsConnection(where: OrderProductWhereInput, orderBy: OrderProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrderProductConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  siteInfo(where: SiteInfoWhereUniqueInput!): SiteInfo
  siteInfoes(where: SiteInfoWhereInput, orderBy: SiteInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SiteInfo]!
  siteInfoesConnection(where: SiteInfoWhereInput, orderBy: SiteInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SiteInfoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type SiteInfo {
  id: ID!
  address: Address!
  hours(where: HoursWhereInput, orderBy: HoursOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Hours!]
  phone: String!
  email: String!
  about: String!
  services: [String!]!
}

type SiteInfoConnection {
  pageInfo: PageInfo!
  edges: [SiteInfoEdge]!
  aggregate: AggregateSiteInfo!
}

input SiteInfoCreateInput {
  address: AddressCreateOneInput!
  hours: HoursCreateManyInput
  phone: String!
  email: String!
  about: String!
  services: SiteInfoCreateservicesInput
}

input SiteInfoCreateservicesInput {
  set: [String!]
}

type SiteInfoEdge {
  node: SiteInfo!
  cursor: String!
}

enum SiteInfoOrderByInput {
  id_ASC
  id_DESC
  phone_ASC
  phone_DESC
  email_ASC
  email_DESC
  about_ASC
  about_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SiteInfoPreviousValues {
  id: ID!
  phone: String!
  email: String!
  about: String!
  services: [String!]!
}

type SiteInfoSubscriptionPayload {
  mutation: MutationType!
  node: SiteInfo
  updatedFields: [String!]
  previousValues: SiteInfoPreviousValues
}

input SiteInfoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SiteInfoWhereInput
  AND: [SiteInfoSubscriptionWhereInput!]
  OR: [SiteInfoSubscriptionWhereInput!]
  NOT: [SiteInfoSubscriptionWhereInput!]
}

input SiteInfoUpdateInput {
  address: AddressUpdateOneRequiredInput
  hours: HoursUpdateManyInput
  phone: String
  email: String
  about: String
  services: SiteInfoUpdateservicesInput
}

input SiteInfoUpdateManyMutationInput {
  phone: String
  email: String
  about: String
  services: SiteInfoUpdateservicesInput
}

input SiteInfoUpdateservicesInput {
  set: [String!]
}

input SiteInfoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  address: AddressWhereInput
  hours_every: HoursWhereInput
  hours_some: HoursWhereInput
  hours_none: HoursWhereInput
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  about: String
  about_not: String
  about_in: [String!]
  about_not_in: [String!]
  about_lt: String
  about_lte: String
  about_gt: String
  about_gte: String
  about_contains: String
  about_not_contains: String
  about_starts_with: String
  about_not_starts_with: String
  about_ends_with: String
  about_not_ends_with: String
  AND: [SiteInfoWhereInput!]
  OR: [SiteInfoWhereInput!]
  NOT: [SiteInfoWhereInput!]
}

input SiteInfoWhereUniqueInput {
  id: ID
}

type Subscription {
  address(where: AddressSubscriptionWhereInput): AddressSubscriptionPayload
  category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
  creditCard(where: CreditCardSubscriptionWhereInput): CreditCardSubscriptionPayload
  customer(where: CustomerSubscriptionWhereInput): CustomerSubscriptionPayload
  hours(where: HoursSubscriptionWhereInput): HoursSubscriptionPayload
  order(where: OrderSubscriptionWhereInput): OrderSubscriptionPayload
  orderProduct(where: OrderProductSubscriptionWhereInput): OrderProductSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  siteInfo(where: SiteInfoSubscriptionWhereInput): SiteInfoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String!
  password: String!
  isAdmin: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String!
  isAdmin: Boolean
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  isAdmin_ASC
  isAdmin_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  email: String!
  password: String!
  isAdmin: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  isAdmin: Boolean
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  isAdmin: Boolean
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  isAdmin: Boolean
  isAdmin_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`