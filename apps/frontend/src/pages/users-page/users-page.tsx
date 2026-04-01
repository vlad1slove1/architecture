import type { ReactElement } from "react";
import { useUsersPage } from "./ts/use-users-page.js";
import { CreateUserSection } from "./tsx/create-user-section.js";
import { EditUserModal } from "./tsx/edit-user-modal.js";
import { UserByIdSection } from "./tsx/user-by-id-section.js";
import { UsersListSection } from "./tsx/users-list-section.js";

export function UsersPage(): ReactElement {
    const page = useUsersPage();

    return (
        <>
            <UsersListSection
                users={page.users}
                listHint={page.listHint}
                listLoading={page.listLoading}
                actionMessage={page.actionMessage}
                onRefresh={page.refreshUsers}
                onEditUser={page.executeStartEditUser}
                onDeleteUser={page.handleDeleteUser}
            />
            <EditUserModal
                user={page.editingUser}
                statusText={page.editStatus}
                onRequestClose={page.executeCloseEditModal}
                onSubmit={page.handleEditSubmit}
            />
            <UserByIdSection
                userIdInput={page.getByIdInput}
                resultText={page.getByIdText}
                onUserIdInputChange={page.setGetByIdInput}
                onSubmit={page.handleGetByIdSubmit}
            />
            <CreateUserSection
                statusText={page.createStatus}
                onSubmit={page.handleCreateUserSubmit}
            />
        </>
    );
}
