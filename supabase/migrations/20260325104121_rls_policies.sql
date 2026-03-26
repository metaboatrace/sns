-- ============================================================
-- RLS Policies
-- ============================================================

-- ── profiles ──

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: 論理削除されていないプロフィールのみ閲覧可
CREATE POLICY "profiles_select_active"
  ON profiles FOR SELECT
  USING (deleted_at IS NULL);

-- INSERT: 自分のプロフィールのみ作成可
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id AND banned_at IS NULL AND deleted_at IS NULL);

-- UPDATE: 自分のプロフィールのみ更新可
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id AND banned_at IS NULL AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = id AND banned_at IS NULL AND deleted_at IS NULL);

-- DELETE: 不許可（論理削除を使用するため物理削除は禁止）
-- ポリシーなし = デフォルト拒否


-- ── rate_limit_events ──

ALTER TABLE rate_limit_events ENABLE ROW LEVEL SECURITY;

-- INSERT: 自分のイベントのみ記録可
CREATE POLICY "rate_limit_events_insert_own"
  ON rate_limit_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- SELECT: 自分のイベントのみ閲覧可
CREATE POLICY "rate_limit_events_select_own"
  ON rate_limit_events FOR SELECT
  USING (auth.uid() = user_id);


-- ============================================================
-- updated_at 自動更新トリガー
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
