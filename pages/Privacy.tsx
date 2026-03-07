import React, { useState, useEffect } from "react";
import { AccountTypeSection, AccountType } from "../components/AccountTypeSection";
import { MessagingPermissionsSection, MessagePermission } from "../components/MessagingPermissionsSection";
import { TagsMentionsSection } from "../components/TagsMentionsSection";
import { SaveActionsSection } from "../components/SaveActionsSection";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // adjust path if needed

export default function Privacy() {

  // State
  const [accountType, setAccountType] = useState<AccountType>("public");
  const [messagePermission, setMessagePermission] = useState<MessagePermission>("everyone");
  const [allowTags, setAllowTags] = useState<boolean>(true);
  const [reviewTags, setReviewTags] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Load privacy settings from Firestore
 useEffect(() => {
  const loadPrivacySettings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data();

        setAccountType(data.accountType ?? "public");
        setMessagePermission(data.messagePermission ?? "everyone");
        setAllowTags(data.allowTags ?? true);
        setReviewTags(data.reviewTags ?? false);
      }
    } catch (error) {
      console.error("Error loading privacy settings:", error);
    }
  };

  loadPrivacySettings();
}, []);


  // Save settings
const handleSave = async () => {
  try {
    setLoading(true);

    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    await updateDoc(userRef, {
      accountType,
      messagePermission,
      allowTags,
      reviewTags
    });

    console.log("Privacy settings updated");
  } catch (error) {
    console.error("Error saving privacy settings:", error);
  } finally {
    setLoading(false);
  }
};

  // Discard changes (reload from Firestore)
 const handleDiscard = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const snapshot = await getDoc(doc(db, "users", user.uid));

  if (snapshot.exists()) {
    const data = snapshot.data();

    setAccountType(data.accountType ?? "public");
    setMessagePermission(data.messagePermission ?? "everyone");
    setAllowTags(data.allowTags ?? true);
    setReviewTags(data.reviewTags ?? false);
  }
};

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 overflow-y-auto custom-scrollbar">

      {/* Header */}
      <header className="space-y-1">
       
        <p className="text-sm text-zinc-500">
          Control how others interact with you and your content.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-12">
        <AccountTypeSection
          accountType={accountType}
          onChange={setAccountType}
        />

        <MessagingPermissionsSection
          messagePermission={messagePermission}
          onChange={setMessagePermission}
        />

        <TagsMentionsSection
          allowTags={allowTags}
          reviewTags={reviewTags}
          onAllowTagsChange={setAllowTags}
          onReviewTagsChange={setReviewTags}
        />

        <SaveActionsSection
          loading={loading}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  );
}