import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export type RejectedAction = PayloadAction<unknown, string, { rejectedWithValue: boolean }, SerializedError>;
