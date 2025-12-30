import * as assetService from "../services/asset.service.js";

export const createAsset = async (req, res) => {
  try {
    const asset = await assetService.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAssets = async (req, res) => {
  const assets = await assetService.findAll();
  res.json(assets);
};

export const getAssetById = async (req, res) => {
  const asset = await assetService.findById(req.params.id);
  if (!asset) return res.status(404).json({ message: "Asset not found" });
  res.json(asset);
};

export const updateAsset = async (req, res) => {
  const asset = await assetService.update(req.params.id, req.body);
  if (!asset) return res.status(404).json({ message: "Asset not found" });
  res.json(asset);
};

export const deleteAsset = async (req, res) => {
  await assetService.remove(req.params.id);
  res.status(204).send();
};
